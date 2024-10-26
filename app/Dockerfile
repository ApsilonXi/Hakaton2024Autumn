# app/Dockerfile
# Базовый образ с Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем остальные файлы приложения и собираем фронтенд
COPY . .
RUN npm run build

# Устанавливаем и запускаем статический сервер для раздачи фронтенда
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Открываем порт 3000 для сервера
EXPOSE 3000
