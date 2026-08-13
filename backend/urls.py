from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/auth/", include("core.urls")),
    path("api/items/", include("item.urls")),
    path("api/dashboard/", include("dashboard.urls")),
    path("api/conversations/", include("conversation.urls")),
    
]


if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )