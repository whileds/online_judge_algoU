FROM node:24-alpine
WORKDIR /app
RUN apk update && apk add --no-cache python3 make g++ 
copy . .
run npm install
EXPOSE 3000
CMD ["node", "index.js"]