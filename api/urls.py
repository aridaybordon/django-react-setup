from django.urls import path

from django.views.generic import TemplateView


app_name = 'api'
urlpatterns = [
    path('clientes/', TemplateView.as_view(template_name='index.html'), name='client')
]
