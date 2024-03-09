FROM node:21-alpine3.17

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "app.js"]

