## Docker Mastery: Lesson 04

### Connecting Multiple Containers (Express + MySQL)

In this lesson, you will learn how multiple Docker containers communicate with each other using a shared Docker network. We will connect an **Express application** container with a **MySQL** container.

---

## Key Concept

Docker containers **do not communicate using `localhost`**.  
Instead, they communicate through a **Docker network** using **container names as hostnames**.

> ✅ Containers must be on the same Docker network  
> ✅ Use the container name as the database host

---

## Setup Instructions

```bash
cp .env.example .env

docker run --name express_mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql
# or
docker run --name express_mysql --env-file .env -p 3306:3306 -d mysql

docker run --rm -it -v "$(pwd):/app" node24_dev:latest npm install

docker run --name express_app -v "$(pwd):/app" -p 3000:3000 -d node24_dev:latest
```

## Docker Network Setup

```bash
docker network create express_net

docker network connect express_net express_app
docker network connect express_net express_mysql
```

## See Network Information

```bash
docker network ls

docker container inspect express_app
docker container inspect express_mysql
```

## CREATE DATABASE and TABLE, then INSERT sample data

```bash
# Access the MySQL container
docker exec -it express_mysql bash

# Log in to MySQL as root user
mysql -u root -p
# Enter password
```

```sql
CREATE DATABASE docker_mastery;

USE docker_mastery;

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);

INSERT INTO posts (title, content) VALUES
('First Post', 'This is the content of the first post.'),
('Second Post', 'This is the content of the second post.');
```

## Verify the inserted data

```sql
SELECT * FROM posts;
```

## Exit MySQL and the container

```bash
exit;
```
