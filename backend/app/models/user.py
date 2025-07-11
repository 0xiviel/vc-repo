from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from fastapi_users.db import SQLAlchemyUserDatabase
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from app.database import Base, get_async_session


class User(Base, SQLAlchemyBaseUserTable[int]):
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True
    )  # 👈 добавь это!
    username: Mapped[str] = mapped_column(
        String(length=100), nullable=False, unique=True
    )


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)
