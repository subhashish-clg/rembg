FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /app

COPY . /app/

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["fastapi", "run", "main.py", "--port", "8000"]

