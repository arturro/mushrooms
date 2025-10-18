# Project Requirements – Mushrooms

## 1. Overview

- Purpose: Full‑stack demo for cataloging organisms and articles.
- Architecture: SPA frontend (Vite + React + TS) + REST-ish API (Django + Django Ninja) + PostgreSQL.
- Containerization: Docker Compose for frontend, backend, and database.

## 2. Tech Stack & Ports

- Frontend: Vite + React + TypeScript (dev: <http://localhost:5173>)
- Backend: Django 5 + Django Ninja (dev: <http://localhost:8000>)
- Database: PostgreSQL 16
  - Host port 5433 → container 5432
- Python tooling: uv image in backend Dockerfile (can use uv locally as well).

## 3. Frontend Requirements

- Routing (react-router-dom):
  - "/" → redirect to "/organismus"
  - "/organismus" → list page (filters + pagination)
  - "/organismus/:id" → detail page
  - "/about" → fetch article by slug "about"
- Layout & responsiveness:
  - Regions: header, left navigation, content, right navigation, footer.
  - On ≤ 900px: stack header → content → footer; hide right nav; left nav becomes a slide‑in drawer toggled by a menu button in the header.
- Navigation & links:
  - Header brand "🍄 Mushrooms" links to home.
  - Header links: Home, Organismus, About (white text; hover background #fc0, text remains white).
  - Left nav links: Organismus List, About; close drawer when tapped on mobile.
- Styles & theming:
  - Header: black background, white text.
  - Footer: black background, white text.
  - Text selection: background #fc0, text black.
  - Content + left/right nav backgrounds: repeating paper texture image (src/assets/paper.svg) on off‑white.
- Pages & data fetching:
  - Organismus list: GET /api/organismus/ with query params page, page_size, name, latin_name. Show items with link to detail; Prev/Next controls.
  - Organismus detail: GET /api/organismus/{id}. Show name, latin_name, description, image (resolve relative MEDIA URL to backend origin).
  - About: GET /api/article/about. Render title, author, image, description, content (pre-wrap).

## 4. Backend Requirements

- Django project with apps:
  - organisms
    - Model Organismus fields: name, latin_name, description, image, created_at, updated_at.
    - API via Django Ninja router mounted under /api/organismus:
      - GET /api/organismus/ → paginated list (PageNumberPagination, default 20), filters: name, latin_name (icontains).
      - GET /api/organismus/{id} → detail.
    - Admin registration with list display and search.
  - articles
    - Model Article fields: title, slug (unique, auto from title, slugify with numeric suffix), description, content, image, author, created_at, updated_at; index on slug.
    - API via Django Ninja router mounted under /api/article:
      - GET /api/article/{slug} → fetch by slug (e.g., "about").
    - Admin registration with search; slug prepopulated from title.
- Core API and system endpoints:
  - GET /api/health → JSON { status: "ok", service: "backend" }.
  - Ninja root mounted at /api/ with subrouters /organismus and /article.
- Settings & middleware:
  - INSTALLED_APPS includes: organisms, articles, corsheaders, Django contrib apps.
  - DEBUG True in dev; CORS_ALLOW_ALL_ORIGINS when DEBUG.
  - Media: MEDIA_URL=/media/, MEDIA_ROOT=backend/media; serve media in DEBUG.
- DB configuration:
  - Use env vars POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT; fallback to SQLite if POSTGRES_HOST unset.
- Docker backend:
  - Base image: ghcr.io/astral-sh/uv:python3.12-bookworm
  - Install requirements via: uv pip install --system -r requirements.txt
  - Startup command: makemigrations → migrate → runserver 0.0.0.0:8000

## 5. Compose Services

- frontend
  - Build ./frontend; ports: 5173:5173; volumes: ./frontend:/app, anonymous for node_modules; CHOKIDAR_USEPOLLING=true.
- backend
  - Build ./backend; ports: 8000:8000; depends_on: db; env uses db:5432 internally.
- db
  - image: postgres:16; ports: 5433:5432; volume pgdata for persistence.

## 6. Developer Workflows

- Docker (recommended):
  - Up: docker compose up -d --build
  - Logs: docker compose logs -f backend | frontend | db
  - Exec: docker compose exec backend python manage.py shell
- Local (optional):
  - Frontend: npm install; npm run dev
  - Backend: uv run python manage.py makemigrations; migrate; runserver 0.0.0.0:8000
  - Local Postgres: set env to host=localhost, port=5433
- Admin: create superuser; manage content via /admin.

## 7. Non‑Functional

- Open CORS in DEBUG only; lock down for prod.
- Basic accessibility: keyboard operable menu button; improve focus trapping as enhancement.
- No CI/CD yet; can add GitHub Actions for lint/build/test.

## 8. Future Enhancements

- CRUD endpoints for Organismus and Article (create/update/delete) with auth.
- Image upload handling and storage backend for production.
- ESLint/Prettier config and formatting scripts; tests (pytest + React Testing Library).
- Global pagination defaults via Ninja API settings.
- Articles list endpoint and a frontend articles index page.
