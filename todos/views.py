from __future__ import unicode_literals

from django.core.urlresolvers import reverse
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import TodoForm
from .models import Todo


@login_required()
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

    return render(request,'todos/list_todos.html',{'form':form,'todo_list':todo_list})


@login_required()
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


@login_required()
def edit_todo(request,pk):
    return redirect(reverse('todos:list_todos'))


@login_required()
def delete_todo(request,pk):
    return redirect(reverse('todos:list_todos'))

