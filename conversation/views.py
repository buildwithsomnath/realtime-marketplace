from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from item.models import Item

from .models import Conversation, Message, MessageReaction
from .serializers import (
    ConversationSerializer,
    MessageSerializer,
)


class ConversationListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    # ==========================================
    # GET /api/conversations/
    # ==========================================

    def get(self, request):

        conversations = (
            Conversation.objects
            .filter(participants=request.user)
            .distinct()
            .prefetch_related(
                "participants",
                "messages",
            )
        )

        serializer = ConversationSerializer(
            conversations,
            many=True,
            context={"request": request},
        )

        return Response(serializer.data)

    # ==========================================
    # POST /api/conversations/
    # ==========================================

    def post(self, request):

        print("================================")
        print("CREATE CONVERSATION")
        print("USER:", request.user)
        print("DATA:", request.data)
        print("================================")

        item_id = request.data.get("item_id")

        if not item_id:
            return Response(
                {
                    "detail": "item_id is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        item = get_object_or_404(
            Item,
            pk=item_id,
        )

        # --------------------------------------
        # Prevent seller contacting themselves
        # --------------------------------------

        if item.created_by == request.user:

            return Response(
                {
                    "detail":
                    "You cannot start a conversation with yourself."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        seller = item.created_by

        # --------------------------------------
        # Check existing conversation
        # --------------------------------------

        conversation = (
            Conversation.objects
            .filter(
                item=item,
                participants=request.user,
            )
            .filter(
                participants=seller,
            )
            .first()
        )

        if conversation:

            serializer = ConversationSerializer(
                conversation,
                context={"request": request},
            )

            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        # --------------------------------------
        # Create conversation
        # --------------------------------------

        conversation = Conversation.objects.create(
            item=item
        )

        conversation.participants.add(
            request.user,
            seller,
        )

        serializer = ConversationSerializer(
            conversation,
            context={"request": request},
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )


class ConversationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    # ==========================================
    # GET /api/conversations/<id>/
    # ==========================================

    def get(self, request, pk):

        conversation = get_object_or_404(
            Conversation,
            pk=pk,
            participants=request.user,
        )

        serializer = ConversationSerializer(
            conversation,
            context={"request": request},
        )

        return Response(serializer.data)

    # ==========================================
    # DELETE
    # ==========================================

    def delete(self, request, pk):

        conversation = get_object_or_404(
            Conversation,
            pk=pk,
            participants=request.user,
        )

        conversation.delete()

        return Response(
            {
                "message":
                "Conversation deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT,
        )


class MessageCreateView(APIView):
    permission_classes = [IsAuthenticated]

    # ==========================================
    # POST /api/conversations/<id>/messages/
    # ==========================================

    def post(self, request, pk):

        conversation = get_object_or_404(
            Conversation,
            pk=pk,
            participants=request.user,
        )

        content = request.data.get("content")

        if not content or not content.strip():

            return Response(
                {
                    "detail":
                    "Message cannot be empty."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        message = Message.objects.create(
            conversation=conversation,
            sender=request.user,
            content=content.strip(),
        )

        # Update conversation.updated_at
        conversation.save()

        serializer = MessageSerializer(
            message,
            context={"request": request},
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )


class MessageReactionToggleView(APIView):
    permission_classes = [IsAuthenticated]

    # ==========================================
    # POST /api/conversations/<id>/messages/<message_id>/react/
    # ==========================================

    def post(self, request, pk, message_id):
        conversation = get_object_or_404(
            Conversation,
            pk=pk,
            participants=request.user,
        )

        message = get_object_or_404(
            Message,
            pk=message_id,
            conversation=conversation,
        )

        emoji = request.data.get("emoji")

        if not emoji:
            return Response(
                {
                    "detail": "emoji is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        existing = MessageReaction.objects.filter(
            message=message,
            user=request.user,
            emoji=emoji,
        ).first()

        if existing:
            existing.delete()
        else:
            MessageReaction.objects.create(
                message=message,
                user=request.user,
                emoji=emoji,
            )

        serializer = MessageSerializer(
            message,
            context={"request": request},
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )