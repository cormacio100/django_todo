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
            try:
                #   Check if user already exists
                user = User.objects.get(username=request.POST['username'])
                return render(request,'accounts/register.html',{'error':'Username already in use'})
            except User.DoesNotExist:
                logger.debug('logging in user: '+request.POST['username'])

                #   Create User Account
                user = User.objects.create_user(username=request.POST['username'],email=request.POST['email'],password=request.POST['password'])
                #   Log the New User in
                login(request,user)

                logger.debug('the login worked')
                return render(request,'accounts/register.html')
        else:
            args = {'error': 'Passwords did not match'}
            return render(request,'accounts/register.html',args)
    else:
        #   Display an empty form
        return render(request,'accounts/register.html')


#   Login view
def login(request):
    return render(request, 'accounts/login.html')
