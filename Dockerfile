FROM node:17-alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
