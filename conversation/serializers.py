from rest_framework import serializers

from .models import Conversation, Message
from item.serializers import ItemSerializer


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Message
        fields = [
            "id",
            "sender",
            "content",
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