from typing import List, Optional
from ninja import Router, ModelSchema
from ninja.pagination import paginate, PageNumberPagination

from .models import Organismus

router = Router(tags=["organismus"])


class OrganismusSchema(ModelSchema):
    class Meta:
        model = Organismus
        fields = ["id", "name", "latin_name", "description", "image"]


@router.get("/", response=List[OrganismusSchema])
@paginate(PageNumberPagination, page_size=20)
def list_organismus(request, name: Optional[str] = None, latin_name: Optional[str] = None):
    qs = Organismus.objects.all()
    if name:
        qs = qs.filter(name__icontains=name)
    if latin_name:
        qs = qs.filter(latin_name__icontains=latin_name)
    return qs


@router.get("/{organismus_id}", response=OrganismusSchema)
def get_organismus(request, organismus_id: int):
    from django.shortcuts import get_object_or_404

    return get_object_or_404(Organismus, id=organismus_id)
