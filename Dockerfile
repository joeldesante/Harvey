FROM node:15.5.0

RUN mkdir source
WORKDIR /source

COPY src /source/src
COPY config /source/config
COPY nodemon.json /source
COPY package.json /source
COPY tsconfig.json /source

RUN npm install
CMD ["npx", "nodemon", "-L"]