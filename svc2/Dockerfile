FROM node:14-alpine
WORKDIR /home/src
COPY . .
RUN npm install
EXPOSE 2222
CMD ["npm", "run", "app"]