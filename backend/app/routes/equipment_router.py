from fastapi import APIRouter, Depends
from app.services.equipment_service import EquipmentService, get_equipment_service
from app.models.schemas import EquipmentCreate, EquipmentRead, EquipmentUpdate

router = APIRouter(prefix="", tags=["equipment"])


@router.get("", response_model=list[EquipmentRead])
async def get_all(service: EquipmentService = Depends(get_equipment_service)):
    return await service.get_all()


@router.post("", response_model=EquipmentRead)
async def create_equipment(
    data: EquipmentCreate, service: EquipmentService = Depends(get_equipment_service)
):
    return await service.create(data)


@router.get("/{equipment_id}", response_model=EquipmentRead)
async def get_by_id(
    equipment_id: int, service: EquipmentService = Depends(get_equipment_service)
):
    return await service.get(equipment_id)


@router.put("/{equipment_id}", response_model=EquipmentRead)
async def update_equipment(
    equipment_id: int,
    data: EquipmentUpdate,
    service: EquipmentService = Depends(get_equipment_service),
):
    return await service.update(equipment_id, data)


@router.delete("/{equipment_id}")
async def delete_equipment(
    equipment_id: int, service: EquipmentService = Depends(get_equipment_service)
):
    await service.delete(equipment_id)
    return {"detail": "Deleted"}
