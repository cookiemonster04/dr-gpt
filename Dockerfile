FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["webpack", "--config", "webpack.config.frontend.js", "&&", "webpack", "--config", "webpack.config.backend.js"]
EXPOSE 8000
