FROM node

ENV NODE_ENV production

WORKDIR /application

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]