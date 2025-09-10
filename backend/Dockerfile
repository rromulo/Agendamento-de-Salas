FROM node:20-alpine

WORKDIR ./app-backend

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npx tsc && npx sequelize db:create && npx sequelize db:migrate && npm run db:seed && npm run dev"]
