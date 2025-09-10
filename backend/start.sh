#!/bin/sh

echo "Running migrations..."
npx tsc
npx sequelize db:create
npx sequelize db:migrate
npm run db:seed
node -r tsconfig-paths/register dist/server.js
echo "Starting server..."
npm run dev