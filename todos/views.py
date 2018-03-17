from __future__ import unicode_literals

from django.core.urlresolvers import reverse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

def list_todos(request):
    return render(request,'todos/list_todos.html')

def create_todo(request):
    return redirect(reverse('todos:list_todos'))