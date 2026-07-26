from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import SignupSerializer, ProfileSerializer

from rest_framework_simplejwt.tokens import RefreshToken


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print("Authorization:", request.headers.get("Authorization"))

        return Response({"ok": True})


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "authorization": request.headers.get("Authorization"),
            "user": str(request.user),
            "authenticated": request.user.is_authenticated,
        })