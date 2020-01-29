FROM node:12.7.0-alpine
EXPOSE 3000 9229

WORKDIR /home/app

COPY . /home/app

RUN chmod +x ./scripts/start.sh

# COPY package.json /home/app/
# COPY package-lock.json /home/app/
# COPY ./scripts/start.sh /home/app/scripts/

RUN npm config set registry http://registry.npmjs.org
# RUN npm install 

RUN npm ci

RUN npm run test

RUN npm run lint

RUN npm run build

RUN ls -lah

CMD sh ./scripts/start.sh