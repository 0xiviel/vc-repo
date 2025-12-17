# backend/app/services/user_manager.py

from fastapi import Depends, Security, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi_users import BaseUserManager, IntegerIDMixin
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from app.models.user import User, get_user_db
from app.settings import settings


security = HTTPBearer()


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = settings.SECRET_KEY
    verification_token_secret = settings.SECRET_KEY

    async def on_after_register(self, user: User, request=None):
        print(f"User registered: {user.id}")


async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(security),
):
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
        )
    return {"token": credentials.credentials}


async def admin_only(user=Depends(get_current_user)):
    return True
