# Этап сборки (build stage)
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production

# Копируем весь исходный код в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Этап запуска (production stage)
FROM node:18-alpine

# Устанавливаем рабочую директорию для готового приложения
WORKDIR /app

# Копируем только необходимые production зависимости
COPY --from=build /app/node_modules ./node_modules

# Копируем собранные файлы приложения
COPY --from=build /app/dist ./dist

# Экспонируем порт, на котором будет работать приложение
EXPOSE 3000

# Запуск приложения
CMD ["node", "dist/main"]