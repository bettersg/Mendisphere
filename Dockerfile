FROM node:19

ENV DIRPATH=/usr/src/app
WORKDIR ${DIRPATH}

COPY ./package-lock.json /usr/src/app/

RUN echo ls

RUN mkdir ${DIRPATH}/public
RUN mkdir ${DIRPATH}/mock-api
RUN mkdir ${DIRPATH}/src

COPY public ${DIRPATH}/public
COPY mock-api ${DIRPATH}/mock-api
COPY src ${DIRPATH}/src

COPY tsconfig.json .
COPY package.json .
COPY docker-compose.yml .
COPY Dockerfile .
COPY README.md .



RUN npm ci

ENV DEBUG=development:*

CMD npm start
