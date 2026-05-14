from io import BytesIO
# Create your views here.

from PyPDF2 import PdfMerger
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def merge_pdfs(request):
    files = request.FILES.getlist('files')

    if len(files) < 2:
        return Response({
            "error": "Upload at least 2 PDF files"
        }, status=400)
    
    merger = PdfMerger()

    try:
        for pdf_file in files:
            merger.append(pdf_file)

        output_buffer = BytesIO()

        merger.write(output_buffer)
        merger.close()

        output_buffer.seek(0)

        response = HttpResponse(
            output_buffer,
            content_type='application/pdf'
        )

        response['Content-Disposition'] = (
            'attachment; filename="merged.pdf"'
        )
        return response
    except Exception as e:
        return Response({
            "error": str(e)
        }, status=500)
    

