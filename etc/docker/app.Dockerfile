FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g pm2
ENV PATH=$PATH:/home/node/.npm-global/bin
COPY . .
CMD ["pm2-runtime", "pm2.yml"]
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:retain 7
RUN pm2 set pm2-logrotate:max_size 100M