FROM node:15.5.0

RUN mkdir source
WORKDIR /source
COPY src /source/src
COPY .env /source
COPY package.json /source
COPY tsconfig.json /source

RUN npm install
CMD npx ts-node ./src/index.ts