FROM node:14-alpine
RUN apk add g++ make py3-pip
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 3000

CMD [ "node", "server/server.js" ]
