# backend/app/services/user_manager.py
from fastapi_users import BaseUserManager, IntegerIDMixin
from app.models.user import User
from app.settings import settings

class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = settings.SECRET_KEY
    verification_token_secret = settings.SECRET_KEY

    async def on_after_register(self, user: User, request=None):
        print(f"User registered: {user.id}")
