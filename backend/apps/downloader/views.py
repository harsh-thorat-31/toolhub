import os 
import uuid

import yt_dlp

from django.http import FileResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

DOWNLOAD_DIR = "downloads"

@api_view(['POST'])
def download_video(request):
    url = request.data.get('url')

    download_type = request.data.get('type', 'video')

    if not url:
        return Response({
            "error": "URL required"
        }, status=400)
    
    unique_id = str(uuid.uuid4())

    output_template = os.path.join(DOWNLOAD_DIR, f"{unique_id}.%(ext)s")

    try:

        if download_type == "video":
            ydl_opts = {
                'outtmpl':output_template,
                'format':'bestvideo+bestaudio/best',
                'merge_output_format': 'mp4',
            }
        else:
            ydl_opts={
                'outtmpl':output_template,
                'format':'bestaudio/best',
                'postprocessors':[{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                }],
            }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:

            info = ydl.extract_info(url, download=True)

            downloaded_file = ydl.prepare_filename(info)

            if download_type == "audio":

                downloaded_file = (
                    os.path.splitext(downloaded_file)[0] + ".mp3"
                )

        return FileResponse(
            open(downloaded_file, 'rb'),
            as_attachment=True
        )
    
    except Exception as e:
        return Response({
            "error": str(e)
        }, status=500)
