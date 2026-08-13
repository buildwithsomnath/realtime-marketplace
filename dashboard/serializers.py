from rest_framework import serializers

from item.models import Item


class DashboardItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"