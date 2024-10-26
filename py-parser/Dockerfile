# py-parser/Dockerfile
# Базовый образ с Python
FROM python:3.12

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем requirements.txt и устанавливаем зависимости (если есть)
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Копируем все файлы приложения
COPY . .

# Открываем порт для Flask
EXPOSE 5000

# Запуск Flask-приложения
CMD ["python", "process-link.py"]
