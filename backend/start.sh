#!/bin/sh
echo "Running migrations..."
npx tsc
npx sequelize db:create
npx sequelize db:migrate
npm run db:seed
echo "Starting server..."
node dist/server