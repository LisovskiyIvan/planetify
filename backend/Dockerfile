# Этап сборки (build stage)
FROM node:18 AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Этап запуска (production stage)
FROM node:18-alpine

# Устанавливаем рабочую директорию для готового приложения
WORKDIR /app

# Копируем зависимости в production-окружение
COPY --from=build /app/node_modules ./node_modules

# Копируем собранные файлы приложения
COPY --from=build /app/dist ./dist

# Экспонируем порт, на котором будет работать приложение
EXPOSE 3000

# Запуск приложения
CMD ["node", "dist/main"]