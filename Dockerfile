FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production --verbose

COPY . .

CMD [ "npm", "start" ]
