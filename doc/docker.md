# Docker

## Install

```
sudo curl -sSL https://get.docker.com | sh
```

## Check Version

```
sudo docker --version
```

## Modify Mirror

```
sudo nano /etc/docker/daemon.json
```
```
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

## Restart Docker

```
sudo systemctl restart docker.service
```

## Enable Docker

```
sudo systemctl enable docker.service
```

## Install Docker UI

```
sudo docker pull portainer/portainer
```

```
sudo docker volume create portainer_data
sudo docker run -d -p 9000:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```
