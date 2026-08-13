from urllib.parse import parse_qs

from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser

from rest_framework_simplejwt.authentication import JWTAuthentication


@database_sync_to_async
def get_user(token):
    try:
        jwt_auth = JWTAuthentication()

        validated_token = jwt_auth.get_validated_token(token)

        return jwt_auth.get_user(validated_token)

    except Exception as exc:
        print("JWT WebSocket authentication failed:", exc)
        return AnonymousUser()


class JWTAuthMiddleware(BaseMiddleware):

    async def __call__(self, scope, receive, send):

        query_string = scope.get("query_string", b"").decode()

        query_params = parse_qs(query_string)

        token = query_params.get("token", [None])[0]

        if token:
            scope["user"] = await get_user(token)
        else:
            scope["user"] = AnonymousUser()

        return await super().__call__(
            scope,
            receive,
            send,
        )