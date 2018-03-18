from __future__ import unicode_literals

from django.core.urlresolvers import reverse
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import TodoForm
from .models import Todo

#   For use with REST
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from todos.serializer import TodoSerializer
from todos.models import Todo

import logging
logger = logging.getLogger(__name__)


#@login_required()
def list_todos(request):

    #   Try to retrieve the list of Todos for the current user
    try:
        todo_list = Todo.objects.filter(user_id=request.user.id)
    except:
        todo_list = {}

    '''
        if NOT POST:
        Create a reference to the form and pass as an argument
        to the template
    '''
    if request.method != 'POST':
        form =  TodoForm(request.user)

    return render(request,'todos/list_todos.html',{'form':form,'todo_list':todo_list,'username':request.user.username})


#@login_required()
def create_todo(request):
    """
    -   Need to create a FORM in forms.py
    -   Assign current user to the todo object
    -   Save the Todo
    -   Forward the user back to the todo list
    """
    #   If the form has been posted
    if request.method == 'POST':
        form = TodoForm(request.user,request.POST)

        #   If the form is valid then save it
        if form.is_valid():
            #   the currently logged in user is associated with
            #   the Todo item
            form.save()
            return redirect(reverse('todos:list_todos'))
        else:
            messages.error(request,'There was an issue and Todo item did not save')

    #   refresh the list of todos
    return redirect(reverse('todos:list_todos'))


#@login_required()
def edit_todo(request,pk):
    '''
    -   Retrieve the Todo item if POST is the method to get to this function
    -   Pass it to the template 'list-todo'
    -   Use If/Else in the template to populate the form if object was passed
    '''
    if request.method == 'POST':
        todo = Todo.objects.get(id=pk)
        form = TodoForm(request.user, request.POST,instance=todo)
        return render(request, 'todos/list_todos.html', {'form':form})
    else:
        return redirect(reverse('todos:list_todos'))


#@login_required()
def delete_todo(request,pk):
    #   ensure that the request came from the dislike form in the template
    if request.method == 'POST':
        todo = Todo.objects.get(id=pk)
        todo.delete()

    return redirect(reverse('todos:list_todos'))


"""
Class Based View to handle incoming API requests relating to 'todo' items
"""
class TodosView(APIView):
    def get(self,request,pk=None):
        """
        Handles GET requests
        -   If no primary key is contained in the URL
            -   Retrieve a complete list of 'todo' items from the Todo model,
            -   serialize them using the TodoSerializer to JSON and return the serialized todo items
        -   Else if a primary key was supplied
            -   Only retrieve the instance for the relevant record based on the primary key
        """
        user_id = 'all'
        page = 'all'
        status = 'all'
        recordsPerPage = 8

        if pk is None:
            logger.debug('REQUEST GET CONTENTS')
            logger.debug(request.GET)

            #   check the user
            if self.request.POST.get('user_id') is not None:
                if self.request.POST.get('user_id') != 'all':
                    user_id = self.request.POST.get('user_id')

            #logger.debug('user_id is ');
            #logger.debug(user_id)

            todo_items = Todo.objects.all()
            serializer = TodoSerializer(todo_items,many=True)
            #   use a variable to store the serialized data
            serialized_data = serializer.data
            return Response(serialized_data)
        else:
            todo= Todo.objects.get(id=pk)
            serializer = TodoSerializer(todo)
            serialized_data = serializer.data
            return Response(serialized_data)

    def post(self,request):
        """
        Handles POST requests
        This view takes the 'data' property from the 'request' object,
        deserializes it into a 'Todo' object and stores it in the DB

        Returns a 201(successfully created) if the item is successfully created,
        otherwise returns a 400 (bad request)
        """
        serializer = TodoSerializer(data=request.data)

        """
        -   Check if valid
            -   if not
                -   a bad request response is returned
            -   else
                -   save the data and return the data a success status
        """
        if not serializer.is_valid():
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save()
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)

    def put(self,request,pk):
        """
        Handle PUT requests
        -   Retrieve a Todo instance based on primary key from URL
        -   Take the data property from the 'request' object
            -   Update the relevant 'todo' instance
        -   Check to see if the data in the request is valid
            -   If not:
                -   a 400 (bad request) is returned
            -   else
                -   save and returns the updated object data
        """
        todo = Todo.objects.get(id=pk)
        serializer = TodoSerializer(todo,data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save()
            return Response(serializer.data)

    def delete(self,request,pk):
        """
        Handle DELETE requests to the API

        Retrieves a 'todo' instance based on the primary key passed in the URL
        and then deletes the relevant instance

        Returns a 204 (no content) status to indicate that the item was deleted
        """
        todo = Todo.objects.get(id=pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
