from django.contrib import admin
from .models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "slug", "author", "created_at")
    search_fields = ("title", "slug", "author")
    prepopulated_fields = {"slug": ("title",)}
