FROM node:20-alpine

WORKDIR ./app-backend

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/server.js"]
