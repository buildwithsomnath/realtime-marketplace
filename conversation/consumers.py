from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .models import Conversation, Message


class ConversationConsumer(
    AsyncJsonWebsocketConsumer
):

    async def connect(self):

        self.conversation_id = self.scope[
            "url_route"
        ]["kwargs"]["conversation_id"]

        self.room_group_name = (
            f"conversation_{self.conversation_id}"
        )

        user = self.scope.get("user")

        print(
            "WebSocket user:",
            user,
            "authenticated:",
            user.is_authenticated if user else False,
        )

        # -----------------------------
        # Authentication
        # -----------------------------

        if not user or not user.is_authenticated:

            print(
                "WebSocket rejected: unauthenticated"
            )

            await self.close(code=4401)

            return

        # -----------------------------
        # Check conversation access
        # -----------------------------

        allowed = await self.user_can_access_conversation(
            user,
            self.conversation_id,
        )

        if not allowed:

            print(
                "WebSocket rejected: user not participant"
            )

            await self.close(code=4403)

            return

        # -----------------------------
        # Join group
        # -----------------------------

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )

        await self.accept()

        print(
            f"WebSocket connected: "
            f"user={user.id}, "
            f"conversation={self.conversation_id}"
        )

    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )

        print(
            "WebSocket disconnected:",
            close_code,
        )

    async def receive_json(
        self,
        content,
        **kwargs
    ):

        message = (
            content.get("message") or
            content.get("content") or
            ""
        ).strip()

        if not message:
            return

        user = self.scope["user"]

        # -----------------------------
        # Save message
        # -----------------------------

        saved_message = (
            await self.create_message(
                user,
                self.conversation_id,
                message,
            )
        )

        # -----------------------------
        # Send to everyone in conversation
        # -----------------------------

        await self.channel_layer.group_send(

            self.room_group_name,

            {
                "type": "chat_message",

                "message": {
                    "id": saved_message["id"],
                    "content": saved_message["content"],
                    "sender_id": saved_message["sender_id"],
                    "sender_username": saved_message[
                        "sender_username"
                    ],
                    "created_at": saved_message[
                        "created_at"
                    ],
                },
            },
        )

    async def chat_message(self, event):

        await self.send_json({
            "type": "message",
            "message": event["message"],
            **event["message"],
        })

    @database_sync_to_async
    def user_can_access_conversation(
        self,
        user,
        conversation_id,
    ):

        return Conversation.objects.filter(
            id=conversation_id,
            participants=user,
        ).exists()

    @database_sync_to_async
    def create_message(
        self,
        user,
        conversation_id,
        content,
    ):

        conversation = Conversation.objects.get(
            id=conversation_id,
        )

        message = Message.objects.create(
            conversation=conversation,
            sender=user,
            content=content,
        )

        conversation.save(
            update_fields=["updated_at"]
        )

        return {
            "id": message.id,
            "content": message.content,
            "sender": user.username,
            "sender_id": user.id,
            "sender_username": user.username,
            "created_at": message.created_at.isoformat(),
        }