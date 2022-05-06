FROM node:16.15.0-alpine

RUN mkdir /app/
WORKDIR /app/
ADD package.json /app/package.json
RUN npm install
ADD . /app/

CMD ["npm", "run", "start"]
