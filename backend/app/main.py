from fastapi_users import FastAPIUsers
from app.models.user import User
from app.models.schemas import UserCreate, UserRead, UserUpdate
from app.services.user_manager import UserManager, get_user_manager
from app.dependencies.auth import auth_backend
from fastapi_users.db import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy import select
from app.settings import settings
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI
from app.routes.root import router as root_router
from app.routes.equipment_router import router as equipment_router
from app.routes.workspace_router import router as workspace_router


app = FastAPI(
    title="Virtual Company API",
    description="API for Virtual Company application",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Include root router
app.include_router(root_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include equipment router
app.include_router(equipment_router, prefix="/equipment", tags=["equipment"])
app.include_router(workspace_router, prefix="/workspaces", tags=["workspace"])

engine = create_async_engine(settings.DATABASE_URL)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

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

app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)


@app.on_event("startup")
async def create_superuser():
    async with async_session_maker() as session:
        user_db = SQLAlchemyUserDatabase(session, User)
        manager = UserManager(user_db)

        existing = await session.execute(
            select(User).where(User.email == "admin@example.com")
        )
        if not existing.scalars().first():
            await manager.create(
                UserCreate(
                    email="admin@example.com", password="admin", username="admin", is_superuser=True, is_active=True
                ),
                safe=True,
            )
