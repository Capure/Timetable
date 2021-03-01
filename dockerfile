FROM node:lts

COPY . .

RUN yarn

RUN yarn build

CMD yarn start
