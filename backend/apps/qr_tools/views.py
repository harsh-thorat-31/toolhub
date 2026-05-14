import qrcode
from io import BytesIO

from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
def test_api(request):
    return Response({
        "message":"Backend Connected Successfully"
    })


@api_view(["POST"])
def generate_qr_code(request):

    data = request.data.get('data')

    if not data:
        return Response({"error": "No data provided"}, status=400)
    
    qr = qrcode.make(data)

    buffer = BytesIO()

    qr.save(buffer, format='PNG')

    buffer.seek(0)

    return HttpResponse(buffer, content_type='image/png')