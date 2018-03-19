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

    def __init__(self,todo_items,many=False,num_pages=0,count=0):
        #   We need to return the num_pages and count with the data for the Pagination
        self.num_pages = num_pages
        self.count = count
        super(TodoSerializer,self).__init__(todo_items,many=False)

    page_count = serializers.SerializerMethodField('num_pages_func')
    count = serializers.SerializerMethodField('count_func')

    def num_pages_func(self,foo):
        return self.num_pages

    def count_func(self,foo):
        return self.count

    class Meta:
        model = Todo
        fields = ('id','title','description','status','user_id','page_count','count')