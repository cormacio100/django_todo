from rest_framework import serializers
from .models import Event


#   Serializers define the API representation.
class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        #   fields to expose
        fields = ('title','description','eventDate','status')


