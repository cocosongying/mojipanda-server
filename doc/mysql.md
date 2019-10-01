```
sudo docker pull hypriot/rpi-mysql
```

```
sudo docker run -p 3306:3306 --name mp-mysql -v $PWD/conf:/etc/mysql/conf.d -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d hypriot/rpi-mysql
```