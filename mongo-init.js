// mongo-init.js
// This script will auto-initialize replica set if not already initialized
rsConf = {
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo1:27017" },
    { _id: 1, host: "mongo2:27017" },
    { _id: 2, host: "mongo3:27017" }
  ]
};

try {
  var status = rs.status();
  print("Replica set already initialized");
} catch (e) {
  print("Initializing replica set...");
  rs.initiate(rsConf);
}
