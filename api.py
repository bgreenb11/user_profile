from rest_framework import generics, permissions, viewsets
from django.contrib.auth.models import User
from .models import Project
from .serializers import ProjectSerializer, UserSerializer


class RestrictedWrite(permissions.BasePermission):
    """ RestrictedWrite Permission Class
            Requires a user to be authenticated for write-based methods
            Allows all (anonymous and authenticated) users read access
    """

    def has_permission(self, request, view):
        requires_authentication = ["POST", "PUT", "DELETE"]
        if request.method in requires_authentication:
            return request.user and request.user.is_authenticated
        else:
            return True


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = [
        RestrictedWrite,
    ]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        try:
            return self.request.user.projects.all()
        except AttributeError:
            return None

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
