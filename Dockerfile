FROM keymetrics/pm2:10-alpine
ENV NODE_ENV production

COPY package*.json ./

RUN apk add --no-cache curl && \
    npm install @babel/cli @babel/core -g && \
    npm install && \
    rm -rf build/*

COPY . .

RUN npm run build && \
    rm -rf src/

EXPOSE 5000

CMD [ "npm", "run", "start" ]