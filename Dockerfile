FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

RUN npm cache clean -f

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]
