from . import auth
from . import views

from rest_framework_simplejwt.views import TokenRefreshView

from rest_framework.routers import DefaultRouter
from django.urls import path, include

app_name = 'api'

router = DefaultRouter()
""" Add additional API endpoints here by resgistering them to the router variable
(e.g router.register('/endpoint', views.EndpointView, basename='endpoint-name') )
"""

urlauth = [
    path('api/token/',
         auth.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/',
         TokenRefreshView.as_view(),
         name='token_refresh'),
]

urlpatterns = [*urlauth, *router.urls]
