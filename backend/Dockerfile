# syntax=docker/dockerfile:1
# Use Astral uv image which includes Python and uv
FROM ghcr.io/astral-sh/uv:python3.12-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
  PYTHONUNBUFFERED=1

WORKDIR /app

# Install Python dependencies with uv (system site-packages)
COPY requirements.txt ./
RUN uv pip install --system -r requirements.txt

# Copy project
COPY . .

EXPOSE 8000

CMD ["sh", "-c", "python manage.py makemigrations --noinput && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
