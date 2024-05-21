
FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y yes

EXPOSE 3003

CMD ["sh", "./start.sh"]
