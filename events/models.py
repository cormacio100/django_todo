# -*- coding: utf-8 -*-
# -*- coding: utf-8 -*-
from django.db import models
from django.conf import settings    #   For accessing the default user model


class Event(models.Model):
    STATUS_TYPES = (
        ('Upcoming', 'Upcoming'),
        ('Ongoing', 'Ongoing'),
        ('Expired', 'Expired'),
    )
    #   There exists a One-To-Many relationship between User and Event
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    title = models.CharField(
        max_length = 30
    )
    description = models.CharField(
        max_length = 200,
    )
    eventDate = models.DateField(null=True, blank=True)
    status = models.CharField(
        max_length = 10,
        choices = STATUS_TYPES,
        default = 'Upcoming'
    )

    def __unicode__(self):
        return self.title