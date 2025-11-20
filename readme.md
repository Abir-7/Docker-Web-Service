# Docker Compose Service Setup

This project runs:

- Postgres (DB)  
- Redis  
- RabbitMQ 
- MongoDB (3-node Replica Set)

## Start / Stop Services
```bash
docker-compose -f docker-compose-service.yml up -d   
docker-compose -f docker-compose-service.yml down
```

## Connection Strings

### Postgres
- **Docker:** `postgres://postgres:postgres@postgres:5432/mydatabase`  
- **Local:** `postgres://postgres:postgres@localhost:5432/mydatabase`  

### Create Database
-  `docker exec -it postgres psql -U postgres` "OR" `docker-compose -f docker-compose-service.yml exec postgres psql -U postgres`
- `CREATE DATABASE [db_name];`  

### Redis
- **Docker:** `redis://redis:6379`  
- **Local:** `redis://localhost:6379`  

### RabbitMQ
- **Docker:** `amqp://user:password@rabbitmq:5672`  
- **Local:** `amqp://user:password@localhost:5672`  
- **UI:** [http://localhost:15672](http://localhost:15672)  

### MongoDB Replica Set
- **Docker:** `mongodb://mongo1:27017,mongo2:27018,mongo3:27019/mydb?replicaSet=rs0`  
- **Local:** `mongodb://<pc_ip>:<primary_port>/<db_name>?directConnection=true`  

### Initialize Replica Set
```bash
docker exec -it mongo1 mongosh
> rs.initiate({
    _id: "rs0",
    members: [
      { _id: 0, host: "mongo1:27017" },
      { _id: 1, host: "mongo2:27017" },
      { _id: 2, host: "mongo3:27017" }
    ]
})
```
### Drizzle Command
```
npx drizzle-kit generate
npx drizzle-kit push 
```
### Local S3 minio env
```
AWS_REGION=us-east-1
AWS_S3_ENDPOINT=http://localhost:9000
AWS_S3_FORCE_PATH_STYLE=true
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin
AWS_S3_BUCKET=my-test-bucket

```

### docker-compose -f docker-compose-service.yml ps  --- to see running container in linux

