FROM node:18.20.4-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 4173

CMD ["npm", "run", "dev"]