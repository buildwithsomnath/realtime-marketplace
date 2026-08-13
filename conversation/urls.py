from django.urls import path

from .views import (
    ConversationListCreateView,
    ConversationDetailView,
    MessageCreateView,
)


app_name = "conversation"


urlpatterns = [

    path(
        "",
        ConversationListCreateView.as_view(),
        name="conversation-list-create",
    ),

    path(
        "<int:pk>/",
        ConversationDetailView.as_view(),
        name="conversation-detail",
    ),

    path(
        "<int:pk>/messages/",
        MessageCreateView.as_view(),
        name="message-create",
    ),
]