from rest_framework import serializers

from .models import Category, Item


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


class ItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = "__all__"

    def get_image(self, obj):
        request = self.context.get("request")

        if obj.image:
            if request:
                return request.build_absolute_uri(
                    obj.image.url
                )

            return obj.image.url

        return None