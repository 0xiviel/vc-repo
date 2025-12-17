from typing import List, Optional
from datetime import date
from fastapi import Depends
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_async_session
from app.models.schemas import BookingCreate, BookingUpdate, AvailableWorkspaceRead
from app.models.booking import Booking
from app.models.workspace import Workspace


class BookingCRUD:
    def __init__(self, db_session: AsyncSession) -> None:
        self.db_session = db_session

    async def create(self, data: BookingCreate) -> Booking:
        """Create a new booking record"""
        booking = Booking(
            date_from=data.date_from,
            date_to=data.date_to,
            workspace_id=data.workspace_id,
            equipment_id=data.equipment_id,
            user_id=data.user_id,
        )
        self.db_session.add(booking)
        await self.db_session.commit()
        await self.db_session.refresh(booking)
        return booking

    async def get(self, booking_id: int) -> Optional[Booking]:
        """Get a booking by ID"""
        query = select(Booking).where(Booking.id == booking_id)
        result = await self.db_session.execute(query)
        return result.scalar_one_or_none()

    async def get_all(self) -> List[Booking]:
        """Get all bookings"""
        query = select(Booking)
        result = await self.db_session.execute(query)
        return list(result.scalars().all())

    async def update(self, booking_id: int, data: BookingUpdate) -> Optional[Booking]:
        """Update a booking"""
        booking = await self.get(booking_id)
        if not booking:
            return None

        if data.date_from is not None:
            booking.date_from = data.date_from
        if data.date_to is not None:
            booking.date_to = data.date_to
        if data.workspace_id is not None:
            booking.workspace_id = data.workspace_id
        if data.equipment_id is not None:
            booking.equipment_id = data.equipment_id

        await self.db_session.commit()
        await self.db_session.refresh(booking)
        return booking

    async def delete(self, booking_id: int) -> bool:
        """Delete a booking"""
        booking = await self.get(booking_id)
        if not booking:
            return False

        await self.db_session.delete(booking)
        await self.db_session.commit()
        return True

    async def get_available_workspaces(
        self, start_date: date, end_date: date
    ) -> List[AvailableWorkspaceRead]:
        """
        Get all available (unbooked) workspaces for a given date range

        A workspace is considered unavailable if there's any booking that overlaps
        with the requested period (date_from <= end_date AND date_to >= start_date)
        """
        # First, find all workspaces that are booked in the specified period
        booked_query = (
            select(Booking.workspace_id)
            .where(and_(Booking.date_from <= end_date, Booking.date_to >= start_date))
            .distinct()
        )
        booked_result = await self.db_session.execute(booked_query)
        booked_workspace_ids = [row[0] for row in booked_result.all()]

        # Then find all workspaces that are not in the booked list
        if booked_workspace_ids:
            query = select(Workspace).where(Workspace.id.not_in(booked_workspace_ids))
        else:
            # If no workspaces are booked, return all workspaces
            query = select(Workspace)

        result = await self.db_session.execute(query)
        workspaces = list(result.scalars().all())

        # Convert to AvailableWorkspaceRead schema
        return [AvailableWorkspaceRead(id=ws.id, name=ws.name) for ws in workspaces]


def get_booking_service(
    session: AsyncSession = Depends(get_async_session),
) -> BookingCRUD:
    return BookingCRUD(session)
