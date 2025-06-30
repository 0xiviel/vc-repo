from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from app.database import Base


class User(Base, SQLAlchemyBaseUserTable[int]):
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)  # 👈 добавь это!
    username: Mapped[str] = mapped_column(String(length=100), nullable=False, unique=True)
