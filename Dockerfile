FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./
RUN pnpm install

COPY . .


COPY .env ./

RUN pnpm run build
RUN npx prisma generate

EXPOSE 5000

CMD ["pnpm", "run", "prod"]
