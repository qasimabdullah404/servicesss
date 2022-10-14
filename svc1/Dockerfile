FROM node:14-alpine
WORKDIR /home/src
COPY . .
RUN npm install
EXPOSE 1111
CMD ["npm", "run", "app"]