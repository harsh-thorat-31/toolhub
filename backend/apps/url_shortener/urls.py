from django.urls import path
from .views import create_short_url, redirect_url

urlpatterns = [
    path('create-short-url/', create_short_url),
    path('s/<str:short_code>/',redirect_url),
]
