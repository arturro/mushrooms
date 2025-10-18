from ninja import Router, ModelSchema
from django.shortcuts import get_object_or_404

from .models import Article

router = Router(tags=["article"])


class ArticleSchema(ModelSchema):
    class Meta:
        model = Article
        fields = ["id", "title", "slug", "description", "content", "image", "author", "created_at", "updated_at"]


@router.get("/{slug}", response=ArticleSchema)
def get_by_slug(request, slug: str):
    return get_object_or_404(Article, slug=slug)
