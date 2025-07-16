from sqlalchemy import Integer, ForeignKey, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date
from app.database import Base
from app.models.workspace import Workspace
from app.models.equipment import Equipment
from app.models.user import User


class Booking(Base):
    """
    Model for storing information about booked workplaces and equipment.
    """
    __tablename__ = "bookings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    date_from: Mapped[date] = mapped_column(Date, nullable=False)
    date_to: Mapped[date] = mapped_column(Date, nullable=False)

    # Foreign keys
    workspace_id: Mapped[int] = mapped_column(Integer, ForeignKey("workspaces.id"), nullable=False)
    equipment_id: Mapped[int] = mapped_column(Integer, ForeignKey("equipment.id"), nullable=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), nullable=False)

    # Relationships
    workspace: Mapped[Workspace] = relationship("Workspace", lazy="joined")
    equipment: Mapped[Equipment] = relationship("Equipment", lazy="joined")
    user: Mapped[User] = relationship("User", lazy="joined")