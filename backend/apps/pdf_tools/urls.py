from django.urls import path
from .views import merge_pdfs

urlpatterns = [
    path('merge-pdfs/', merge_pdfs),
]
