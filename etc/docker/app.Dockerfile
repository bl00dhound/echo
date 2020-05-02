FROM node:9
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g pm2
ENV PATH=$PATH:/home/node/.npm-global/bin
COPY . .
CMD ["pm2-runtime", "pm2.yml"]
RUN ./etc/pm2/logrotate-setup.sh