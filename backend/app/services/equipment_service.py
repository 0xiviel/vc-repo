from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.equipment import Equipment
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


def get_equipment_service(
    session: AsyncSession = Depends(get_async_session),
) -> EquipmentService:
    return EquipmentService(session)
