FROM node:12-alpine

WORKDIR /app

COPY ./package.json .
COPY ./tsconfig.json .
COPY ./src ./src

RUN yarn install

RUN yarn build

EXPOSE 3333

CMD [ "node", "dist/src/index.js" ]