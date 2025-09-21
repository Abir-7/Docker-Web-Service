 ##======================================================
 
 ##🚀 Docker Compose Service Setup

 ##This file runs:
## - Postgres (DB)
## - Redis (Cache / PubSub)
## - RabbitMQ (Message Queue with Management UI)
# - MongoDB Replica Set (3-node cluster)
#
# =============================================
# 📦 Start Services:
#   docker-compose -f docker-compose-service.yml up -d
#
# 🔄 Stop Services:
#   docker-compose -f docker-compose-service.yml down
#
# =============================================
# 🛠️ Connection Strings
#
# 🔹 Postgres
#   - Inside Docker: postgres://postgres:postgres@postgres:5432/mydatabase
#   - Local Node.js: postgres://postgres:postgres@localhost:5432/mydatabase
#
# 🔹 Redis
#   - Inside Docker: redis://redis:6379
#   - Local Node.js: redis://localhost:6379
#
# 🔹 RabbitMQ
#   - Inside Docker: amqp://user:password@rabbitmq:5672
#   - Local Node.js: amqp://user:password@localhost:5672
#   - UI: http://localhost:15672 (user / password)
#
# 🔹 MongoDB Replica Set
#   - Inside Docker: mongodb://mongo1:27017,mongo2:27018,mongo3:27019/mydb?replicaSet=rs0
#   - Local Node.js: mongodb://localhost:27017,localhost:27018,localhost:27019/mydb?replicaSet=rs0
#
# ⚠️ Init Replica Set:
#   docker exec -it mongo1 mongosh
#   > rs.initiate({
#       _id: "rs0",
#       members: [
#         { _id: 0, host: "mongo1:27017" },
#         { _id: 1, host: "mongo2:27018" },
#         { _id: 2, host: "mongo3:27019" }
#       ]
#     })
#
# =============================================
# 🟢 Example Node.js Connections
#
# Postgres (pg):
#   const client = new Client("postgres://postgres:postgres@localhost:5432/mydatabase");
#
# Redis (ioredis):
#   const redis = new Redis("redis://localhost:6379");
#
# RabbitMQ (amqplib):
#   const conn = await amqp.connect("amqp://user:password@localhost:5672");
#
# MongoDB (mongoose):
#   mongoose.connect("mongodb://localhost:27017,localhost:27018,localhost:27019/mydb?replicaSet=rs0");
#
# ======================================================

## Drizzle Kit Setup
# Generate migrations
npx drizzle-kit generate

# Apply migrations to the database
npx drizzle-kit push
