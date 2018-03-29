from django.conf.urls import url
from . import views
from django.conf.urls import include

#   If multiple url.py files exist, app_name allows you specify in TEMPLATES which url file you want to use
app_name = 'accounts'

urlpatterns = [
    url(r'^register/',views.register,name='register'),
    url(r'^login/',views.login_user,name='login'),
    url(r'^logout/',views.logout_user,name='logout'),
    url(r'^message/(?P<msg>\w+?)/$',views.message,name="message"),

    #   REST framework's login and logout views for the API
    url(r'^api-auth', include('rest_framework.urls'))
]