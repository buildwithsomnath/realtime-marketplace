from django.urls import path

from .views import (
    CategoryListView,
    ItemListCreateView,
    ItemDetailView,
)

app_name = "item"

urlpatterns = [
    path("", ItemListCreateView.as_view(), name="item-list-create"),
    path("categories/", CategoryListView.as_view(), name="category-list"),
    path("<int:pk>/", ItemDetailView.as_view(), name="item-detail"),
]