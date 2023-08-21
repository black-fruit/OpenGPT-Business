# OpenGPT-Business
https://github.com/79E/ChatGpt-Web 的1.3.9开源版服务端

商业版GPT源码

# Install

Frontend

```bash
yarn install && yarn build
```

Backend

Edit `server/config.index.js`

```bash
cd server
pm2 start index.js --name chatweb --watch
```

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