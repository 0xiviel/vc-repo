from fastapi import APIRouter, Depends, Query
from datetime import date
from typing import List
from app.services.booking_service import BookingCRUD, get_booking_service
from app.models.schemas import (
    BookingCreate,
    BookingRead,
    BookingUpdate,
    AvailableWorkspaceRead,
)
from app.services.user_manager import get_current_user
from app.models.user import User

router = APIRouter(prefix="", tags=["booking"])


@router.post("", response_model=BookingRead)
async def create_booking(
    data: BookingCreate,
    service: BookingCRUD = Depends(get_booking_service),
    current_user: User = Depends(get_current_user),
):
    """Create a new booking - must be authenticated"""
    # Set the user_id to the current user's ID
    data.user_id = current_user.id
    return await service.create(data)


@router.get("", response_model=List[BookingRead])
async def get_all_bookings(
    service: BookingCRUD = Depends(get_booking_service),
    _: User = Depends(get_current_user),
):
    """Get all bookings - must be authenticated"""
    return await service.get_all()


@router.get("/available-workspaces", response_model=List[AvailableWorkspaceRead])
async def get_available_workspaces(
    start_date: date = Query(..., description="Start date of the desired period"),
    end_date: date = Query(..., description="End date of the desired period"),
    service: BookingCRUD = Depends(get_booking_service),
    _: User = Depends(get_current_user),
):
    """Get all available (unbooked) workspaces for a given date range - must be authenticated"""
    return await service.get_available_workspaces(start_date, end_date)


@router.get("/{booking_id}", response_model=BookingRead)
async def get_booking_by_id(
    booking_id: int,
    service: BookingCRUD = Depends(get_booking_service),
    _: User = Depends(get_current_user),
):
    """Get a booking by ID - must be authenticated"""
    return await service.get(booking_id)


@router.put("/{booking_id}", response_model=BookingRead)
async def update_booking(
    booking_id: int,
    data: BookingUpdate,
    service: BookingCRUD = Depends(get_booking_service),
    _: User = Depends(get_current_user),
):
    """Update a booking - must be authenticated"""
    return await service.update(booking_id, data)


@router.delete("/{booking_id}")
async def delete_booking(
    booking_id: int,
    service: BookingCRUD = Depends(get_booking_service),
    _: User = Depends(get_current_user),
):
    """Delete a booking - must be authenticated"""
    return await service.delete(booking_id)
