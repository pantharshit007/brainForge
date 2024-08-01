# Backend Dockerfile

FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

# no need since BE will automatically be up by FE
CMD [ "npm", "run", "dev"]