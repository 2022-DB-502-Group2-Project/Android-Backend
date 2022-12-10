# Service API
***
- API for service using node.js
***
## Warning
- **This API only supports x86-64 CPU Architecture docker engine**
***
## TODO 
- [ ] Add swagger document
- [ ] Add authentification API using passport
***
## Docker Execution

1. Build image

```
docker build -t (image name) .
```

2. Run container
```
docker run -d --name (container name) -p (port):3000 -p (port):4000 (image name)
```
***
## Container config

- Ports
    - 3000 : Swagger UI
    - 4000 : Application
- CMD
    - npm start
