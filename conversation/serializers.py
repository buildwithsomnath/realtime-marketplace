from rest_framework import serializers

from .models import Conversation, Message, MessageReaction
from item.serializers import ItemSerializer


class MessageReactionSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source="user.id")
    username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = MessageReaction
        fields = [
            "id",
            "user_id",
            "username",
            "emoji",
            "created_at",
        ]


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField(read_only=True)
    sender_id = serializers.ReadOnlyField(source="sender.id")
    sender_username = serializers.ReadOnlyField(source="sender.username")
    reactions = MessageReactionSerializer(many=True, read_only=True)

    class Meta:
        model = Message
        fields = [
            "id",
            "sender",
            "sender_id",
            "sender_username",
            "content",
            "reactions",
            "is_read",
            "created_at",
        ]


class ConversationSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)
    participants = serializers.StringRelatedField(many=True)
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = [
            "id",
            "item",
            "participants",
            "messages",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]