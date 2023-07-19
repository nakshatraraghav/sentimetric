FROM node:18.16.1-alpine

LABEL author="nakshatra raghav <nakshatra.raghav@gmail.com>"

RUN mkdir -p www/app

COPY * /www/app

WORKDIR /www/app

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm sync:db

EXPOSE 1337

CMD ["pnpm", "prod"]
