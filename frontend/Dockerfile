FROM node:18 AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если он есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Сборка приложения для production
RUN npm run build

# Step 2: Настройка Nginx для раздачи статических файлов
FROM nginx:alpine

# Копируем собранное приложение из предыдущего этапа в директорию, которую Nginx использует для статики
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомный файл конфигурации Nginx (если нужно)
COPY nginx.conf /etc/nginx/sites-enabled/default
COPY default.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]