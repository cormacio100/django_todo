from rest_framework import serializers
from todos.models import Todo


class TodoSerializer(serializers.ModelSerializer):
    """
    Used to serialize the Todo model to JSON
    The fields to be serialized are:
    -   id
    -   title
    -   description
    -   status
    -   user_id
    """
    class Meta:
        model = Todo
        fields = ('id','title','description','status','user_id')