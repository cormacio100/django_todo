# -*- coding: utf-8 -*-
from django.db import models
from django.conf import settings    #   For accessing the default user model

class Todo(models.Model):
    STATUS_TYPES = (
        ('Todo', 'Todo'),
        ('Doing', 'Doing'),
        ('Done', 'Done'),
    )
    #   There exists a One-To-Many relationship between User and Todo
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    title = models.CharField(
        max_length = 15
    )
    description = models.CharField(
        max_length = 200,
    )
    status = models.CharField(
        max_length = 10,
        choices = STATUS_TYPES,
        default = 'Todo'
    )

    def __unicode__(self):
        return self.title