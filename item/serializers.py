from rest_framework import serializers

from .models import Category, Item


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


class ItemSerializer(serializers.ModelSerializer):

    created_by = serializers.CharField(
        source="created_by.username",
        read_only=True
    )

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    class Meta:
        model = Item

        fields = [
            "id",
            "category",
            "category_name",
            "name",
            "description",
            "price",
            "image",
            "is_sold",
            "created_at",
            "created_by",
        ]

        read_only_fields = [
            "id",
            "category_name",
            "created_by",
            "created_at",
            "is_sold",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)

        request = self.context.get("request")

        if instance.image and request:
            data["image"] = request.build_absolute_uri(
                instance.image.url
            )

        return data