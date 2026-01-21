## Docker Mastery: Lesson 03

In this lesson, we focus on building our own custom Docker image using a Dockerfile. This is a critical step in real-world Docker usage, where applications are packaged with their dependencies in a repeatable and portable way.

You will learn how Docker images are constructed layer by layer, how each instruction in a Dockerfile works, and how to turn your application source code into a runnable container image.

### Build Your Custom Docker Image and Run Application

```bash
docker build -t node24_dev . # Build an image
docker build --build-arg USERID=$(id -u) --build-arg USERGROUP=$(id -g) -t node24_dev . # Build an image with specify user

docker run --rm -it -v "$(pwd):/app" node24_dev:latest npm install # Install dependencies if you need

docker run --name express_app -v "$(pwd):/app" -p 3000:3000 node24_dev:latest # Run your container and start your application development
docker run --name express_app -v "$(pwd):/app" -p 3000:3000 -d node24_dev:latest # Run your container with detach mode and start your application development
```

### Other Commands

```bash
docker container logs express_app # See a container logs
docker container inspect express_app # Inspect your container
docker container port express_app # check ports in a container
docker exec -it express_app bash # start a bash terminal using a running container
```
