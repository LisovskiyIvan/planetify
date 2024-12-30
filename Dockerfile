# Этап сборки (build stage)
FROM node:22-alpine AS build

WORKDIR /app

COPY backend/package*.json ./

RUN npm ci --only=production

COPY backend .

RUN npx prisma generate
RUN npm run build

# Копируем фронтенд из локальной директории
COPY frontend/dist ./frontend/dist

FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/frontend/dist ./frontend/dist

EXPOSE 3000

# Запуск приложения
CMD ["node", "dist/main"]