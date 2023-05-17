FROM node:18-alpine
WORKDIR C:/Users/cuile/Documents/Documents/Important/CS97/dr-gpt
COPY . .
RUN npm install
# RUN npm run build
EXPOSE 8080
CMD npm run start