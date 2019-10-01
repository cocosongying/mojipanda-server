```
sudo docker pull webhippie/mongodb
```

```
sudo docker run --name mp-mongodb -p 27017:27017 -v $PWD/db:/data/db -d webhippie/mongodb
```