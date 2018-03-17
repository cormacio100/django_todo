from __future__ import unicode_literals

from django.core.urlresolvers import reverse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

import logging
logger = logging.getLogger(__name__)

#   Home view redirects to the login page
def home(request):
    return redirect(reverse('accounts:login'))

#   Registration View
def register(request):
    if request.method =='POST':
        #   check that the passwords match
        if request.POST['password1'] == request.POST['password2']:
            logger.debug('the passwords matched')
            try:
                #   Check if user already exists
                user = User.objects.get(username=request.POST['username'])
                return render(request,'accounts/register.html',{'error':'Username already in use'})
            except User.DoesNotExist:
                logger.debug('logging in user: '+request.POST['username'])
                #   Create User Account
                user = User.objects.create_user(username=request.POST['username'],email=request.POST['email'],password=request.POST['password1'])
                #   Log the New User in
                login(request,user)
                return redirect('todos:list_todos')
        else:
            args = {'message': 'Passwords did not match'}
            return render(request,'accounts/register.html',args)

    else:
        args = {'message': 'Please Register. Method is not POST'}
        #   Display an empty form
        return render(request,'accounts/register.html',args)


#   Login view
def login_user(request):
    """
    1   Check if the form is POSTed
    2   If yes
        -   Authenticate the user
            -   If authentic
                -   Log the user in
                -   Forward user to the todo page
            -   If not authentic
                -   Show error that User not found
    3   If No
        -   Display empty login form
    """
    if request.method == 'POST':
        user = authenticate(username=request.POST['username'],password=request.POST['password'])
        if user is not None:
            login(request,user)
            '''
                USER SHOULD GET FORWARDED TO THE TODO PAGE
            '''

            return redirect('todos:list_todos')
        else:
            args = {'msg': 'User NOT found'}
            return redirect('accounts:message', args)

    args = {'message': ''}
    return render(request, 'accounts/login.html',args)


def logout_user(request):
    if request.method == 'POST':
        logout(request)
    else:
        logger.debug('User is logged out')
    return redirect('home')


def message(request,msg):
    args = {'message':msg}
    return render(request, 'accounts/message.html', args)