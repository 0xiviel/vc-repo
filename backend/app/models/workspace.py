from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class Workspace(Base):
    __tablename__ = "workspaces"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(length=100), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
