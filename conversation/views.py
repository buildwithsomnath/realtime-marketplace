from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from item.models import Item

from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer


class ConversationListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        GET /api/conversations/
        """

        conversations = Conversation.objects.filter(
            participants=request.user
        ).distinct()

        serializer = ConversationSerializer(
            conversations,
            many=True,
        )

        return Response(serializer.data)

    def post(self, request):
        """
        POST /api/conversations/
        """

        item_id = request.data.get("item")

        if not item_id:
            return Response(
                {"detail": "Item id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        item = get_object_or_404(Item, pk=item_id)

        if item.created_by == request.user:
            return Response(
                {
                    "detail": "You cannot start a conversation with yourself."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        conversation = Conversation.objects.filter(
            item=item,
            participants=request.user,
        ).filter(
            participants=item.created_by,
        ).first()

        if conversation:
            serializer = ConversationSerializer(conversation)

            return Response(serializer.data)

        conversation = Conversation.objects.create(
            item=item
        )

        conversation.participants.add(
            request.user,
            item.created_by,
        )

        serializer = ConversationSerializer(conversation)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )


class ConversationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        conversation = get_object_or_404(
            Conversation,
            pk=pk,
            participants=request.user,
        )

        serializer = ConversationSerializer(conversation)

        return Response(serializer.data)

    def delete(self, request, pk):

        conversation = get_object_or_404(
            Conversation,
            pk=pk,
            participants=request.user,
        )

        conversation.delete()

        return Response(
            {
                "message": "Conversation deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT,
        )


class MessageCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        """
        POST /api/conversations/<id>/messages/
        """

        conversation = get_object_or_404(
            Conversation,
            pk=pk,
            participants=request.user,
        )

        content = request.data.get("content")

        if not content:
            return Response(
                {
                    "detail": "Message cannot be empty."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        message = Message.objects.create(
            conversation=conversation,
            sender=request.user,
            content=content,
        )

        conversation.save()

        serializer = MessageSerializer(message)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )