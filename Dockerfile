FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production --verbose

COPY . .

CMD [ "npm", "start" ]
