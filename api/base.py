from django.db import models
from django.contrib.auth.models import AbstractUser

from rest_framework import status, viewsets, serializers
from rest_framework.response import Response


class BaseUser(AbstractUser):
    """User class for Django app"""


class BaseViewSet(viewsets.ViewSet):
    """Base viewset for models. Includes a list and create method.
    
    Parameters:
    - serializer_class: ModelSerializer.
    - model: Model
    """
    serializer_class: serializers.ModelSerializer
    model: models.Model

    def list(self, request, *args, **kwargs):
        q = self.model.objects.all()
        serializer = self.serializer_class(q, many=True)

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None, *args, **kwargs):
        q = self.model.objects.get(id=pk)
        serializer = self.serializer_class(q)

        return Response(serializer.data)

    def destroy(self, request, pk=None, *args, **kwargs):
        q = self.model.objects.get(id=pk)
        if q:
            q.delete()
            return self.list(request=self.request)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)