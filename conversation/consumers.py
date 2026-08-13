from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .models import Conversation, Message, MessageReaction


class ConversationConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        self.conversation_id = self.scope["url_route"]["kwargs"]["conversation_id"]
        self.room_group_name = f"conversation_{self.conversation_id}"

        user = self.scope.get("user")

        if not user or not user.is_authenticated:
            await self.close(code=4401)
            return

        allowed = await self.user_can_access_conversation(
            user,
            self.conversation_id,
        )

        if not allowed:
            await self.close(code=4403)
            return

        self.user_id = user.id
        self.username = user.username

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )

        await self.accept()

        # Broadcast user connected / online status
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "user_status_event",
                "user_id": user.id,
                "username": user.username,
                "status": "online",
            },
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )

        user_id = getattr(self, "user_id", None)
        username = getattr(self, "username", "")

        if user_id:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "user_status_event",
                    "user_id": user_id,
                    "username": username,
                    "status": "offline",
                },
            )

    async def receive_json(self, content, **kwargs):
        msg_type = content.get("type")
        user = self.scope["user"]

        if msg_type == "react_message":
            message_id = content.get("message_id") or content.get("id")
            emoji = content.get("emoji")

            if not message_id or not emoji:
                return

            updated_reactions = await self.toggle_reaction(
                user,
                self.conversation_id,
                message_id,
                emoji,
            )

            if updated_reactions is not None:
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "message_reaction_event",
                        "message_id": message_id,
                        "reactions": updated_reactions,
                    },
                )
            return

        # Regular text message
        message = (
            content.get("message") or
            content.get("content") or
            ""
        ).strip()

        if not message:
            return

        saved_message = await self.create_message(
            user,
            self.conversation_id,
            message,
        )

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": {
                    "id": saved_message["id"],
                    "content": saved_message["content"],
                    "sender_id": saved_message["sender_id"],
                    "sender_username": saved_message["sender_username"],
                    "sender": saved_message["sender"],
                    "reactions": [],
                    "created_at": saved_message["created_at"],
                },
            },
        )

    async def chat_message(self, event):
        await self.send_json({
            "type": "message",
            "message": event["message"],
            **event["message"],
        })

    async def user_status_event(self, event):
        await self.send_json({
            "type": "user_status",
            "user_id": event["user_id"],
            "username": event["username"],
            "status": event["status"],
        })

    async def message_reaction_event(self, event):
        await self.send_json({
            "type": "message_reaction",
            "message_id": event["message_id"],
            "reactions": event["reactions"],
        })

    @database_sync_to_async
    def user_can_access_conversation(self, user, conversation_id):
        return Conversation.objects.filter(
            id=conversation_id,
            participants=user,
        ).exists()

    @database_sync_to_async
    def create_message(self, user, conversation_id, content):
        conversation = Conversation.objects.get(id=conversation_id)
        message = Message.objects.create(
            conversation=conversation,
            sender=user,
            content=content,
        )
        conversation.save(update_fields=["updated_at"])
        return {
            "id": message.id,
            "content": message.content,
            "sender": user.username,
            "sender_id": user.id,
            "sender_username": user.username,
            "created_at": message.created_at.isoformat(),
        }

    @database_sync_to_async
    def toggle_reaction(self, user, conversation_id, message_id, emoji):
        try:
            message = Message.objects.get(
                id=message_id,
                conversation_id=conversation_id,
            )

            existing = MessageReaction.objects.filter(
                message=message,
                user=user,
                emoji=emoji,
            ).first()

            if existing:
                existing.delete()
            else:
                MessageReaction.objects.create(
                    message=message,
                    user=user,
                    emoji=emoji,
                )

            reactions = message.reactions.select_related("user").all()
            return [
                {
                    "id": r.id,
                    "user_id": r.user.id,
                    "username": r.user.username,
                    "emoji": r.emoji,
                    "created_at": r.created_at.isoformat(),
                }
                for r in reactions
            ]
        except Message.DoesNotExist:
            return None