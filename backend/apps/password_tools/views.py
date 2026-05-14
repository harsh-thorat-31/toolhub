import random
import string

from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.


@api_view(['POST'])
def generate_password(request):

    length = int(request.data.get('length', 12))

    use_uppercase = request.data.get('uppercase', True)
    use_lowercase = request.data.get('lowercase', True)
    use_numbers = request.data.get('numbers',True)
    use_symbols = request.data.get('symbols', True)

    characters = ""

    if use_uppercase:
        characters += string.ascii_uppercase
    
    if use_lowercase:
        characters += string.ascii_lowercase

    if use_numbers:
        characters += string.digits

    if use_symbols:
        characters += "!@#$%^&*()_-+=<>,.;:?/~`|\\"

    if not characters:
        return Response({"error": "Select at least one option"}, status=400)
    
    password = ''.join(
        random.choice(characters)
        for _ in range(length)
    )

    return Response({"password": password})