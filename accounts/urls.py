from django.conf.urls import url
from . import views

#   If multiple url.py files exist, app_name allows you specify in TEMPLATES which url file you want to use
app_name = 'accounts'

urlpatterns = [
    url(r'^register/',views.register,name='register'),
    url(r'^login/',views.login,name='login'),
]