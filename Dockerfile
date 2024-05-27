FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5173

CMD ["npm", "run", "build", "&&", "npm", "run", "preview"]
