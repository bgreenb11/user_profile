from django.urls import include, path
from rest_framework import routers
from .views import portfolio, logout
from .api import ProjectViewSet, UserViewSet
from .apps import UserProfileConfig

app_name = UserProfileConfig.name

router = routers.DefaultRouter()

router.register('api/users', UserViewSet, 'users')
router.register('api/projects', ProjectViewSet, 'projects')

urlpatterns = [
    path("", portfolio, name="portfolio"),
    path("", include(router.urls))
]
