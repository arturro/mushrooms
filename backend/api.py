from ninja import NinjaAPI
from organisms.api import router as organismus_router
from articles.api import router as article_router

api = NinjaAPI(title="Mushrooms API")


@api.get("/hello")
def hello(request, name: str = "world"):
    return {"message": f"Hello, {name}!"}

# Mount Organismus routes
api.add_router("/organismus", organismus_router)
api.add_router("/article", article_router)
