# Nginx

## Install

```
sudo apt-get install nginx
```

## Run

```
sudo /etc/init.d/nginx start
```

## Modify

```
sudo nano /etc/nginx/sites-available/default
```

## Restart

```
sudo /etc/init.d/nginx reload
```

```
upstream docker {
    server 127.0.0.1:9000;
}

server {
    listen 80;
    server_name localhost;
    location /docker/ {
        proxy_pass http://docker/;
    }
}
```