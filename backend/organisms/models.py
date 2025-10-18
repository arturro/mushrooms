from django.db import models


class Organismus(models.Model):
    name = models.CharField(max_length=255)
    latin_name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='organisms/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("id",)

    def __str__(self) -> str:
        return self.name
