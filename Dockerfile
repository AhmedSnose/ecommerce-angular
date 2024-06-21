FROM node:18.13.0 as angular
# USER node
RUN npm cache clean --force
RUN npm install -g @angular/cli
WORKDIR /app
COPY package.json /app/
RUN ["npm", "install", "--legacy-peer-deps"]
COPY . /app
EXPOSE 4200 49153
CMD chmod -R 777 .
# CMD ng serve
# EXPOSE 4200/tcp
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "500"]