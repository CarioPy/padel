/** @type {import('next').NextConfig} */

module.exports = {
  nextConfig: {
    reactStrictMode: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    MONGO_URI:
      //"mongodb+srv://Thomas_Allez:IaTKxBAh4WmEpdhC@padeldb.cnx41.mongodb.net/PadelDB?retryWrites=true&w=majority",
      "mongodb://Thomas_Allez:IaTKxBAh4WmEpdhC@padeldb-shard-00-00.cnx41.mongodb.net:27017,padeldb-shard-00-01.cnx41.mongodb.net:27017,padeldb-shard-00-02.cnx41.mongodb.net:27017/PadelDB?ssl=true&replicaSet=atlas-388asx-shard-0&authSource=admin&retryWrites=true&w=majority",
  },
};
