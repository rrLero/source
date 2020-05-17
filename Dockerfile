FROM node:6.12.0

# Создать директорию app
WORKDIR /app

# Используется символ подстановки для копирования как package.json, так и package-lock.json
COPY package*.json ./
COPY yarn.lock ./

RUN npm install -g yarn

RUN yarn install

#RUN NPM i -g forever

# Скопировать исходники приложения
COPY . .

# Собрать статические файлы react/vue/angular
RUN npm run prod

#RUN forever stopall
#RUN NODE_ENV="production" forever start src/server

EXPOSE 8080/udp
# Используется при обслуживании статических файлов
# CMD ["serve", "-s", "dist", "-p", "8080"]
CMD [ "npm", "start" ]