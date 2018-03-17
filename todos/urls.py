from django.conf.urls import url
from . import views

#   If multiple url.py files exist, app_name allows you specify in TEMPLATES which url file you want to use
app_name = 'todos'

urlpatterns = [
    url(r'^list_todos/',views.list_todos,name='list_todos'),
    url(r'^create_todo/',views.create_todo,name='create_todo'),
    url(r'^(?P<pk>[0-9]+)/edit_todo/',views.edit_todo,name='edit_todo'),
]