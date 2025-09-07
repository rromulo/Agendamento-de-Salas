FROM node:18-alpine

WORKDIR ./app-backend

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npx tsc && npx sequelize db:create && npm run dev"]