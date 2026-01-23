## Docker Mastery: Lesson 05

### Express and MySQL with Docker Compose

In this lesson, you will learn how multiple Docker containers communicate with each other using a shared Docker network. We will connect an Express.js application container with a MySQL database container using Docker Compose.

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

docker run --rm -it -v "$(pwd):/app" node24_dev:latest npm install
```

## Run application with Docker Compose

```bash
docker compose up -d # start your application

docker compose down # remove containers, networks (stop application)
docker compose down -v # remove containers, networks, and volume
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
