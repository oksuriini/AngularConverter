# Stage 1

FROM node as BUILD

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# Stage 2

FROM nginx:alpine


COPY --from=BUILD /app/dist/02-unitconverter/browser /usr/share/nginx/html

EXPOSE 80
