from datetime import date, timedelta
from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import and_
from app.models.equipment import Equipment
from app.models.booking import Booking
from app.models.schemas import EquipmentCreate, EquipmentUpdate

from app.database import get_async_session


class EquipmentService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_all(self):
        result = await self.session.execute(select(Equipment))
        return result.scalars().all()

    async def get(self, equipment_id: int):
        result = await self.session.execute(
            select(Equipment).where(Equipment.id == equipment_id)
        )
        equipment = result.scalars().first()
        if not equipment:
            raise HTTPException(status_code=404, detail="Equipment not found")
        return equipment

    async def create(self, equipment_in: EquipmentCreate):
        equipment = Equipment(**equipment_in.dict())
        self.session.add(equipment)
        await self.session.commit()
        await self.session.refresh(equipment)
        return equipment

    async def update(self, equipment_id: int, equipment_in: EquipmentUpdate):
        equipment = await self.get(equipment_id)
        for key, value in equipment_in.dict(exclude_unset=True).items():
            setattr(equipment, key, value)
        await self.session.commit()
        await self.session.refresh(equipment)
        return equipment

    async def delete(self, equipment_id: int):
        equipment = await self.get(equipment_id)
        await self.session.delete(equipment)
        await self.session.commit()
        return {"detail": "Deleted successfully"}

    async def get_usage_report(self, start_date: date, end_date: date) -> dict:
        """
        Generate a usage report for equipment within a date range.
        Returns a dictionary with dates as keys and equipment usage counts as values.
        """
        if end_date < start_date:
            raise HTTPException(
                status_code=422, 
                detail="end_date must be greater than or equal to start_date"
            )

        # Get all equipment
        equipment_result = await self.session.execute(select(Equipment))
        all_equipment = equipment_result.scalars().all()
        equipment_names = {eq.id: eq.name for eq in all_equipment}

        # Get bookings that overlap with the date range and have equipment
        bookings_result = await self.session.execute(
            select(Booking).where(
                and_(
                    Booking.equipment_id.isnot(None),
                    Booking.date_from <= end_date,
                    Booking.date_to >= start_date
                )
            )
        )
        bookings = bookings_result.scalars().all()

        # Initialize the report data structure
        report_data = {}
        current_date = start_date
        while current_date <= end_date:
            date_key = current_date.strftime("%Y.%m.%d")
            report_data[date_key] = {name: 0 for name in equipment_names.values()}
            current_date += timedelta(days=1)

        # Count equipment usage per day
        for booking in bookings:
            if booking.equipment_id and booking.equipment_id in equipment_names:
                equipment_name = equipment_names[booking.equipment_id]
                # For each day in the booking that overlaps with our range
                booking_start = max(booking.date_from, start_date)
                booking_end = min(booking.date_to, end_date)
                current_date = booking_start
                while current_date <= booking_end:
                    date_key = current_date.strftime("%Y.%m.%d")
                    if date_key in report_data:
                        report_data[date_key][equipment_name] += 1
                    current_date += timedelta(days=1)

        return {"data": report_data}


def get_equipment_service(
    session: AsyncSession = Depends(get_async_session),
) -> EquipmentService:
    return EquipmentService(session)

