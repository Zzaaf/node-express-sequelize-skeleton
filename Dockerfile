FROM node
ENV NODE_ENV production
ENV DATABASE_URL postgres://postgres:postgres@5.101.51.140:5432/postgres-db 
WORKDIR /application
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]