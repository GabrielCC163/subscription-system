FROM node:16.13.2

ARG NODE_ENV=local
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

RUN npm install --silent

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]