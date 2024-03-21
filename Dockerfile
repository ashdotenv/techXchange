FROM node:21-alpine3.17

WORKDIR /usr/src/app

COPY package.*json . 

RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]

