import re

from PyPDF2 import PdfReader

from rest_framework.decorators import api_view
from rest_framework.response import Response


COMMON_SKILLS = [

    "python",
    "django",
    "react",
    "javascript",
    "sql",
    "html",
    "css",
    "git",
    "docker",
    "rest api",
    "tailwind",
    "mongodb",
    "aws",
    "machine learning",
    "ai"
]


@api_view(['POST'])
def analyze_resume(request):

    resume_file = request.FILES.get('resume')

    if not resume_file:

        return Response({
            "error": "Resume file required"
        }, status=400)

    try:

        reader = PdfReader(resume_file)

        extracted_text = ""

        for page in reader.pages:

            text = page.extract_text()

            if text:
                extracted_text += text.lower()

        found_skills = []

        missing_skills = []

        for skill in COMMON_SKILLS:

            if skill in extracted_text:
                found_skills.append(skill)
            else:
                missing_skills.append(skill)

        ats_score = int(
            (len(found_skills) / len(COMMON_SKILLS)) * 100
        )

        suggestions = []

        if ats_score < 50:

            suggestions.append(
                "Add more technical skills"
            )

        if "projects" not in extracted_text:

            suggestions.append(
                "Add project section"
            )

        if "experience" not in extracted_text:

            suggestions.append(
                "Add experience section"
            )

        return Response({

            "ats_score": ats_score,

            "found_skills": found_skills,

            "missing_skills": missing_skills,

            "suggestions": suggestions
        })

    except Exception as e:

        return Response({
            "error": str(e)
        }, status=500)