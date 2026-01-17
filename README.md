## Docker Mastery: Lesson 02

In this lesson, we learn how to use Docker to run a JavaScript file using Node.js, starting from Docker’s core concepts and progressing to running a real-world Express.js application inside a Docker container.

This lesson is designed to provide both conceptual understanding and hands-on experience, making Docker easy to grasp for developers at the beginner to intermediate level.

### Basic Docker Command

- Download an image from a registry.

  ```bash
  docker pull image_name
  ```

- Create and run a new container from an image (image will pull if not exists).

  ```bash
  docker run image_name
  ```

- To get command information, use `--help` tag.
  ```bash
  docker --help
  docker run --help
  ```
- Image and container list.

  ```bash
  docker image ls
  docker container ls
  docker container ls -a // non-active containers included
  ```

- Delete an image.

  ```bash
  docker rmi image_id_or_name
  docker image prune // Remove unused images
  ```

- Delete a container.
  ```bash
  docker rm container_id_or_name
  docker container prune // Remove all stopped containers
  ```

### Run JavaScript with Docker image

- Check Nodejs and NPM version.

  ```bash
  docker run --rm node:24 node --version
  docker run --rm node:24 npm --version
  ```

- Run a Javascript file.

  ```bash
  docker run --rm -w /app -v "$(pwd):/app" node:24 node test.js
  ```

  - `--rm` = Automatically remove the container and its associated anonymous volumes when it exits.
  - `-w /app` = Working directory inside the container
  - `-v "$(pwd):/app"` = Bind mount a volume

- Start a bash terminal using a Docker image and you may also run from here.

  ```bash
  docker run --rm -it -w /app -v "$(pwd):/app" node:24 bash
  ```

  - `-it` = `-i` (Keep STDIN open even if not attached) and `-t` (Allocate a pseudo-TTY). Here we use `-it` to start a terminal.

### Setup Expressjs with Docker image

```bash
// init package.json
docker run --rm -it --name express_app -w /app -v "$(pwd):/app" -u "$(id -u):$(id -g)" node:24 npm init -y

// install expressjs
docker run --rm -it --name express_app -w /app -v "$(pwd):/app" -u "$(id -u):$(id -g)" node:24 npm install express

// install nodemon
docker run --rm -it --name express_app -w /app -v "$(pwd):/app" -u "$(id -u):$(id -g)" node:24 npm i nodemon

// start development server but it will not auto-remove container here
docker run --name express_app -w /app -v "$(pwd):/app" -u "$(id -u):$(id -g)" -p 3000:3000 node:24 npm run dev

// you may stop development server via stopping container
docker stop express_app

// you may again start development server via starting container
docker start express_app
```

  - `--name express_app` = Specify a container name
  - `-u "$(id -u):$(id -g)"` = Specify a user which will get read, write and execute permission inside container

