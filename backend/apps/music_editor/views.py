import os
import uuid

from django.http import FileResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from pydub import AudioSegment


TEMP_DIR = "downloads"


@api_view(['POST'])
def process_audio(request):

    audio_file = request.FILES.get('audio')

    output_format = request.data.get(
        'format',
        'mp3'
    )

    start_time = request.data.get('start')

    end_time = request.data.get('end')

    if not audio_file:

        return Response({
            "error": "Audio file required"
        }, status=400)

    try:

        # CREATE DOWNLOADS FOLDER

        os.makedirs(
            TEMP_DIR,
            exist_ok=True
        )

        # UNIQUE ID

        unique_id = str(uuid.uuid4())

        # FILE EXTENSION

        original_extension = (
            audio_file.name.split(".")[-1]
        )

        # PATHS

        input_path = os.path.join(
            TEMP_DIR,
            f"{unique_id}_input.{original_extension}"
        )

        output_path = os.path.join(
            TEMP_DIR,
            f"{unique_id}_output.{output_format}"
        )

        # SAVE FILE

        with open(input_path, 'wb+') as destination:

            for chunk in audio_file.chunks():

                destination.write(chunk)

        # LOAD AUDIO

        audio = AudioSegment.from_file(
            input_path,
            format=original_extension
        )

        # TRIM

        if start_time and end_time:

            start_ms = int(float(start_time) * 1000)

            end_ms = int(float(end_time) * 1000)

            audio = audio[start_ms:end_ms]

        # EXPORT

        audio.export(
            output_path,
            format=output_format
        )

        # RETURN FILE

        return FileResponse(
            open(output_path, 'rb'),
            as_attachment=True,
            filename=f"processed.{output_format}"
        )

    except Exception as e:

        print("AUDIO ERROR:", str(e))

        return Response({
            "error": str(e)
        }, status=500)