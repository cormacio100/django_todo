from django.conf.urls import url
from . import views
from todos.views import TodosView

#   If multiple url.py files exist, app_name allows you specify in TEMPLATES which url file you want to use
app_name = 'todos'

urlpatterns = [
    url(r'^list_todos/',views.list_todos,name='list_todos'),
    url(r'^create_todo/',views.create_todo,name='create_todo'),
    url(r'^(?P<pk>[0-9]+)/edit_todo/',views.edit_todo,name='edit_todo'),
    url(r'^(?P<pk>[0-9]+)/delete_todo/',views.delete_todo,name='delete_todo'),

    #   URLS FOR REST API CLASS BASED VIEW
    url(r'^api/$', TodosView.as_view(), name="list_todos_api"),
    url(r'^api/(?P<pk>[0-9]+)/$', TodosView.as_view(), name="update_todos_api"),
    #url(r'^api/delete/(?P<pk>[0-9]+)/$', TodosView.as_view(), name="delete_todo_api")
]