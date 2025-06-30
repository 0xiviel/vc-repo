from fastapi_users import FastAPIUsers
from app.models.user import User
from app.models.schemas import UserCreate, UserRead, UserUpdate
from app.services.user_manager import UserManager
from app.dependencies import auth_backend
from fastapi_users.db import SQLAlchemyUserDatabase
from app.database import get_db
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy import select
from app.settings import settings

from fastapi import FastAPI

app = FastAPI()

engine = create_async_engine(settings.DATABASE_URL)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

def get_user_manager():
    yield UserManager(SQLAlchemyUserDatabase(get_db(), User))

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

@app.on_event("startup")
async def create_superuser():
    async with async_session_maker() as session:
        user_db = SQLAlchemyUserDatabase(session, User)
        manager = UserManager(user_db)

        existing = await session.execute(select(User).where(User.email == "admin@example.com"))
        if not existing.scalars().first():
            await manager.create(
                UserCreate(email="admin@example.com", password="admin", username="admin"),
                safe=True
            )
