from django.contrib import admin

from restTodoApp.todo_api.models import Todo


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    pass
