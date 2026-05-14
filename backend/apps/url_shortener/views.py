import random 
import string

# Create your views here.

from django.shortcuts import redirect

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ShortURL

def generate_short_code(length=6):

    characters = string.ascii_letters + string.digits 

    return ''.join(random.choice(characters)
        for _ in range(length)
    )


@api_view(['POST'])
def create_short_url(request):

    original_url = request.data.get('url')

    if not original_url:
        return Response({"error":"URL is required"}, status=400)

    
    short_code = generate_short_code()

    while ShortURL.objects.filter(short_code=short_code).exists():
        short_code = generate_short_code()
    
    short_url = ShortURL.objects.create(
        original_url = original_url,
        short_code= short_code
    )

    return Response({
        "short_url":f"http://127.0.0.1:8000/s/{short_url.short_code}"
    })


def redirect_url(request, short_code):

    try: 
        url = ShortURL.objects.get(
            short_code=short_code
        )
        return redirect(url.original_url)

    except ShortURL.DoesNotExist:

        return Response({"error":"URL not found"}, status=400)