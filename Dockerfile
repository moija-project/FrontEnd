FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY src .

EXPOSE 3000

COPY ./build ./build

CMD ["npm", "start"]
