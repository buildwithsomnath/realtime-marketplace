from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from item.models import Item

from .serializers import DashboardItemSerializer


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        GET /api/dashboard/
        Dashboard overview.
        """

        user = request.user

        items = Item.objects.filter(created_by=user)

        total_items = items.count()
        available_items = items.filter(is_sold=False).count()
        sold_items = items.filter(is_sold=True).count()

        recent_items = DashboardItemSerializer(
            items.order_by("-created_at")[:5],
            many=True,
            context={"request": request},
        )

        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
            "statistics": {
                "total_items": total_items,
                "available_items": available_items,
                "sold_items": sold_items,
            },
            "recent_items": recent_items.data,
        })


class MyItemsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        GET /api/dashboard/items/
        """

        items = Item.objects.filter(
            created_by=request.user
        ).order_by("-created_at")

        serializer = DashboardItemSerializer(
            items,
            many=True,
            context={"request": request},
        )

        return Response(serializer.data)