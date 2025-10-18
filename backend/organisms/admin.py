from django.contrib import admin
from .models import Organismus

@admin.register(Organismus)
class OrganismusAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "latin_name")
    search_fields = ("name", "latin_name")
