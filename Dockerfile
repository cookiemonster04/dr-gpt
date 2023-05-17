FROM node:18-alpine
WORKDIR /site/wwwroot
COPY . .
RUN npm install
RUN npm run build3
EXPOSE 8080
CMD npm run start