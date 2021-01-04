from django.contrib.auth.models import User
from django.db import models

"""
The project model is primarily used for git projects, but can also be used
to show projects who's source code cannot be shown
"""


class Project(models.Model):
    user = models.ForeignKey(
        User, related_name="user",
        on_delete=models.DO_NOTHING
    )
    title = models.CharField(max_length=30)
    url = models.URLField(default="")
    example = models.URLField(default="")
    image = models.ImageField(upload_to="static/user_profile/assets/")
