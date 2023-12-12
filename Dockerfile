FROM node:14

WORKDIR /usr/src/app

COPY node-api/package*.json ./

RUN npm install

COPY node-api/ .

EXPOSE 3002

CMD ["npm", "start"]
