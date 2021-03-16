from node:12-alpine

WORKDIR /app

COPY ./package.json .
COPY ./public . 
COPY ./src .

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]