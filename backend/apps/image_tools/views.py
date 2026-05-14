from io import BytesIO

from PIL import Image

from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def process_image(request):

    image_file = request.FILES.get('image')

    width = request.data.get('width')
    height = request.data.get('height')

    grayscale = (
        str(request.data.get('grayscale')).lower()
        == 'true'
    )

    if not image_file:

        return Response({
            "error": "No image uploaded"
        }, status=400)

    try:

        image = Image.open(image_file)

        # Convert unsupported modes
        if image.mode == 'RGBA':
            image = image.convert('RGB')

        # Resize
        if width and height:

            image = image.resize(
                (int(width), int(height))
            )

        # Grayscale
        if grayscale:

            image = image.convert('L')

        output_buffer = BytesIO()

        image.save(
            output_buffer,
            format='PNG'
        )

        output_buffer.seek(0)

        return HttpResponse(
            output_buffer,
            content_type='image/png'
        )

    except Exception as e:

        print("ERROR:", str(e))

        return Response({
            "error": str(e)
        }, status=500)