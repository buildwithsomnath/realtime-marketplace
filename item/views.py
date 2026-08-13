from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Item
from .serializers import CategorySerializer, ItemSerializer


class CategoryListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        """
        GET /api/items/categories/
        """
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data)


class ItemListCreateView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        """
        GET /api/items/
        """
        items = Item.objects.filter(is_sold=False)
        serializer = ItemSerializer(items, many=True,context={"request": request})

        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(
            data=request.data,
            context={"request": request}
        )

        if serializer.is_valid():
            serializer.save(created_by=request.user)

            return Response(
                {
                    "message": "Item created successfully.",
                    "item": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class ItemDetailView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, pk):
        return get_object_or_404(Item, pk=pk)

    def get(self, request, pk):
        item = self.get_object(pk)

        serializer = ItemSerializer(
            item,
            context={"request": request}
        )

        return Response(serializer.data)

    def put(self, request, pk):
        item = self.get_object(pk)

        if item.created_by != request.user:
            return Response(
                {
                    "detail": "You do not have permission to edit this item."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = ItemSerializer(
            item,
            data=request.data,
            context={"request": request}
        )

        if serializer.is_valid():
            serializer.save(created_by=request.user)

            return Response(
                {
                    "message": "Item updated successfully.",
                    "item": serializer.data,
                }
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def patch(self, request, pk):
        item = self.get_object(pk)

        if item.created_by != request.user:
            return Response(
                {
                    "detail": "You do not have permission to edit this item."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = ItemSerializer(
            item,
            data=request.data,
            partial=True,
            context={"request": request}
        )

        if serializer.is_valid():
            serializer.save(created_by=request.user)

            return Response(
                {
                    "message": "Item updated successfully.",
                    "item": serializer.data,
                }
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):
        item = self.get_object(pk)

        if item.created_by != request.user:
            return Response(
                {
                    "detail": "You do not have permission to delete this item."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        item.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )    