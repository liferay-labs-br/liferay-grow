FROM node:12-alpine

WORKDIR /app

COPY ./package.json .
COPY ./public ./public 
COPY ./styles ./styles 
COPY ./src ./src
COPY ./next.config.js .
COPY ./tsconfig.json .
COPY ./.babelrc .
COPY ./next-env.d.ts .
COPY ./.env .

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]