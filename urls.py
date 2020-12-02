from django.urls import path
from .views import portfolio
from .apps import UserProfileConfig

app_name = UserProfileConfig.name

urlpatterns = [
    path("", portfolio, name="portfolio"),

]
