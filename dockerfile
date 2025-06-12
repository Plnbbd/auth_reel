# Dockerfile (frontend)
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/ged-adcsa-angular /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
