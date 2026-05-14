from django.urls import path
from .views import download_video

urlpatterns = [
    path('download-video/',download_video),
]
