FROM node:14.17-alpine3.11
RUN mkdir -p /usr/myapp
WORKDIR /usr/myapp
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "docker"]
