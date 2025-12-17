# backend/app/routes/equipment_router.py

from datetime import date
from fastapi import APIRouter, Depends, Query
from app.services.equipment_service import EquipmentService, get_equipment_service
from app.models.schemas import (
    EquipmentCreate,
    EquipmentRead,
    EquipmentUpdate,
    EquipmentUsageReportResponse,
)
from app.dependencies.auth import current_active_superuser, current_active_user
from app.models.user import User


router = APIRouter(prefix="/equipment", tags=["equipment"])


@router.get("", response_model=list[EquipmentRead])
async def list_equipment(
    service: EquipmentService = Depends(get_equipment_service),
):
    """
    List all equipment items.
    Accessible by anyone (no auth required).
    """
    return await service.get_all()


@router.get("/usage-report", response_model=EquipmentUsageReportResponse)
async def get_equipment_usage_report(
    start_date: date = Query(..., description="Start date of the report period"),
    end_date: date = Query(..., description="End date of the report period"),
    service: EquipmentService = Depends(get_equipment_service),
    _: User = Depends(current_active_user),
):
    """
    Generate equipment usage report for a date range.
    Returns the count of bookings for each equipment on each day within the range.
    Requires authentication.
    """
    return await service.get_usage_report(start_date, end_date)


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
    "", response_model=EquipmentRead, dependencies=[Depends(current_active_superuser)]
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
    dependencies=[Depends(current_active_superuser)],
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


@router.delete("/{equipment_id}", dependencies=[Depends(current_active_superuser)])
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
