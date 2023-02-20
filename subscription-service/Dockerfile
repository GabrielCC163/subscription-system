FROM node:16.13.2

ARG NODE_ENV=local
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app/public-service

COPY package*.json ./
COPY .npmrc ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]