FROM node:16.13.2

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

RUN npm install --silent

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main"]