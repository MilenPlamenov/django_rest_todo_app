from django.urls import path

from restTodoApp.todo_api.views import TodoListCreateAPIView, TodoRetrieveUpdateDestroyAPIView, index

urlpatterns = [
    path('', index, name='index'),
    path('todo-list-create/', TodoListCreateAPIView.as_view(), name='todo-list-create'),
    path('todo-retrieve-update-destroy/<str:pk>/', TodoRetrieveUpdateDestroyAPIView.as_view(),
         name='todo-retrieve-update-destroy'),
]
