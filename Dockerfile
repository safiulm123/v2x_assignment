FROM node:11
COPY v2x-Assignment /usr/src/app
WORKDIR /usr/src/app/v2x-Assignment
RUN npm install && npm run build
EXPOSE 5000
CMD [ "npm", "run","initialize" ]
