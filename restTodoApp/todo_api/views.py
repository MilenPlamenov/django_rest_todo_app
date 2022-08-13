from django.shortcuts import render
from rest_framework import generics

from restTodoApp.todo_api.models import Todo
from restTodoApp.todo_api.serializers import TodoSerializer


def index(request):
    return render(request, 'index.html')


class TodoListCreateAPIView(generics.ListCreateAPIView):
    """
    Create / List todos -> all

    """
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class TodoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve / Update / Delete todos -> with pk

    """
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
