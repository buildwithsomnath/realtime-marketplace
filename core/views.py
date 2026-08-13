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
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        GET /api/auth/profile/
        """
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        """
        PUT /api/auth/profile/
        Replace the entire profile.
        """
        serializer = ProfileSerializer(
            request.user,
            data=request.data,
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Profile updated successfully.",
                    "user": serializer.data,
                }
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def patch(self, request):
        """
        PATCH /api/auth/profile/
        Partially update the profile.
        """
        serializer = ProfileSerializer(
            request.user,
            data=request.data,
            partial=True,
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Profile updated successfully.",
                    "user": serializer.data,
                }
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request):
        """
        DELETE /api/auth/profile/
        Delete the authenticated user's account.
        """
        user = request.user
        user.delete()

        return Response(
            {
                "message": "Account deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT,
        )