from django.urls import path

from .views import DashboardView, MyItemsView

app_name = "dashboard"

urlpatterns = [
    path("", DashboardView.as_view(), name="dashboard"),
    path("items/", MyItemsView.as_view(), name="my-items"),
]