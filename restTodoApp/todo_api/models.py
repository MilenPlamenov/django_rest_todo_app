from django.db import models


class Todo(models.Model):
    TODO_NAME_MAX_LENGTH = 25
    name = models.CharField(
        max_length=TODO_NAME_MAX_LENGTH,
    )

    state = models.BooleanField(
        default=False,
    )

    def __str__(self):
        return self.name
    
