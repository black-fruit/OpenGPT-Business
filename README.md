# OpenGPT-Business

## About

Official Demo: [Click Here](https://www.aizj.top/)

https://github.com/79E/ChatGpt-Web ' front+backend code

商业版GPT源码, Business GPT src

Full open source, can be secondary development

# Install

## Frontend

Do this in terminal (dic=`/<site>`)

```bash
yarn install && yarn build
```

## Backend

Edit `server/config/index.js`

Do this in terminal (dic=`/<site>`)

```bash
cd server
pm2 start index.js --name chatweb --watch
```
## Web Access

Set site running dictionary to `dist` folder.

Add this to site config:
```yml
location / {
  try_files $uri $uri/ @router;
  index index.html;
}

location @router {
  rewrite ^.*$ /index.html last;
}
```

Add `Reverse proxy`, set like this

```config
Access URl = /api
Proxy URl = http://127.0.0.1:3200/api
Catch = 1min
```
