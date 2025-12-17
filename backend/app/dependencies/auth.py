# app/core/auth.py

from fastapi_users import FastAPIUsers
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy,
)
from app.services.user_manager import get_user_manager
from app.models.user import User


def get_jwt_strategy() -> JWTStrategy:
    from app.settings import settings

    return JWTStrategy(secret=settings.SECRET_KEY, lifetime_seconds=3600)


bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")

auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)


fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)


current_active_user = fastapi_users.current_user(active=True)
current_active_superuser = fastapi_users.current_user(active=True, superuser=True)
