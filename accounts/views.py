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
                args = {'message':'User Registered and logged in'}
                return render(request,'accounts/register.html',args)
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
    NEED TO DO CHECK HERE LIKE IN REGISTER AND FORWARD USER TO THE TODO PAGE IF WORKS
    :param request:
    :return:
    """
    args = {'message': ''}
    return render(request, 'accounts/login.html',args)
