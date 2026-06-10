# Docker Infrastructure Service

This project provides a pre-configured Docker Compose environment with essential services for local development, including S3 (MinIO), MongoDB (with transaction support), PostgreSQL, pgAdmin, and Redis.

## Services Included

| Service | Image | Port(s) | Notes |
| :--- | :--- | :--- | :--- |
| **S3 (MinIO)** | `minio/minio` | `9000`, `9001` | S3 compatible storage. Console at `9001`. |
| **MongoDB** | `mongo:latest` | `27017` | Configured as a single-node replica set for **Transactions**. |
| **PostgreSQL** | `postgres:latest` | `5432` | Relational database. |
| **pgAdmin** | `dpage/pgadmin4` | `5050` | Web-based UI for PostgreSQL. |
| **Redis** | `redis:latest` | `6379` | In-memory data store/cache. |

---

## Getting Started

### 1. Prerequisites
- Docker and Docker Compose installed on your machine.

### 2. Start the Services
Run the following command to start all services in the background:
```bash
docker-compose up -d
```

### 3. Verify MongoDB Replica Set
MongoDB is automatically configured as a replica set named `rs0`. This is required for using **Transactions**. The `mongodb-rs-init` container handles this initialization once the main MongoDB container is healthy.

---

## How to use in other projects

### 1. MongoDB (with Transactions)
**Connection String:**
```text
mongodb://localhost:27017/?replicaSet=rs0
```
> **Note:** Ensure you include `replicaSet=rs0` in your connection string to enable transaction support.

### 2. PostgreSQL
**Connection Details:**
- **Host:** `localhost`
- **Port:** `5432`
- **User:** `admin` (or as defined in `.env`)
- **Password:** `password` (or as defined in `.env`)
- **Database:** `mydatabase` (or as defined in `.env`)

**Connection URIs:**
- **External (from host):** `postgresql://admin:password@localhost:5432/mydatabase`
- **Internal (between containers):** `postgresql://admin:password@postgres:5432/mydatabase`

**pgAdmin GUI:**
- Access via: [http://localhost:5050](http://localhost:5050)
- **Login Email:** `admin@admin.com`
- **Login Password:** `admin`
- **Connecting to Postgres from pgAdmin:**
    - Host name/address: `postgres` (internal Docker network name)
    - Port: `5432`
    - Username: `admin`
    - Password: `password`

### 3. Redis
**Connection String:**
```text
redis://localhost:6379
```

### 4. S3 (MinIO)
To use S3 locally, point your AWS SDK to the MinIO endpoint.

**MinIO Console:**
- Access via: [http://localhost:9001](http://localhost:9001)
- **User:** `minioadmin` (or as defined in `.env`)
- **Password:** `minioadmin` (or as defined in `.env`)

**AWS CLI Configuration:**
```bash
aws --endpoint-url=http://localhost:9000 s3 mb s3://home-screen-bucket
```

**Node.js (AWS SDK v3) Example:**
```javascript
const { S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT || "http://localhost:9000",
  region: process.env.S3_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "minioadmin",
    secretAccessKey: process.env.S3_SECRET_KEY || "minioadmin",
  },
  forcePathStyle: true, // Required for MinIO
});
```

---

## Customization
You can modify the default credentials and database names in the `.env` file before running `docker-compose up`.

```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=password
POSTGRES_DB=mydatabase
PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=admin

S3_ENDPOINT=http://s3:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=home-screen-bucket
S3_REGION=us-east-1
```

## Stopping the Services
To stop and remove containers:
```bash
docker-compose down
```
To also remove persistent data volumes:
```bash
docker-compose down -v
```
