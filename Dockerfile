FROM node:18 as builder

WORKDIR /opt/app

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build


FROM node:18 as final

WORKDIR /opt/app

ENV NODE_ENV "production"

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY --from=builder /opt/app/dist ./dist

ENTRYPOINT [ "npm", "run", "start" ]
