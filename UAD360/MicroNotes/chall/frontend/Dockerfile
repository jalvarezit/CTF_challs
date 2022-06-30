FROM docker.io/node:alpine

COPY micro_notes/package.json /app/package.json

WORKDIR /app

RUN npm install
COPY micro_notes /app

WORKDIR /app

CMD ["npm", "start"]