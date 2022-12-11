FROM node:19

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV DEBUG=development:*

CMD npm start
