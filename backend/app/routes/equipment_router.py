# backend/app/routes/equipment_router.py

from fastapi import APIRouter, Depends
from app.services.equipment_service import EquipmentService, get_equipment_service
from app.models.schemas import EquipmentCreate, EquipmentRead, EquipmentUpdate
from app.dependencies.auth import current_active_superuser


router = APIRouter(
    prefix="/equipment",
    tags=["equipment"]
)


@router.get("", response_model=list[EquipmentRead])
async def list_equipment(
    service: EquipmentService = Depends(get_equipment_service),
):
    """
    List all equipment items.
    Accessible by anyone (no auth required).
    """
    return await service.get_all()


@router.get("/{equipment_id}", response_model=EquipmentRead)
async def retrieve_equipment(
    equipment_id: int,
    service: EquipmentService = Depends(get_equipment_service),
):
    """
    Retrieve a single equipment item by its ID.
    Accessible by anyone (no auth required).
    """
    return await service.get(equipment_id)


@router.post(
    "",
    response_model=EquipmentRead,
    dependencies=[Depends(current_active_superuser)]
)
async def create_equipment(
    data: EquipmentCreate,
    service: EquipmentService = Depends(get_equipment_service),
):
    """
    Create a new equipment item.
    Admins only.
    """
    return await service.create(data)


@router.put(
    "/{equipment_id}",
    response_model=EquipmentRead,
    dependencies=[Depends(current_active_superuser)]
)
async def update_equipment(
    equipment_id: int,
    data: EquipmentUpdate,
    service: EquipmentService = Depends(get_equipment_service),
):
    """
    Update an existing equipment item by its ID.
    Admins only.
    """
    return await service.update(equipment_id, data)


@router.delete(
    "/{equipment_id}",
    dependencies=[Depends(current_active_superuser)]
)
async def delete_equipment(
    equipment_id: int,
    service: EquipmentService = Depends(get_equipment_service),
):
    """
    Delete an equipment item by its ID.
    Admins only.
    """
    await service.delete(equipment_id)
    return {"detail": "Deleted"}
