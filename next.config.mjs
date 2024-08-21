/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "http://localhost:3000/api/",
    MONGO_DB_URL: "mongodb://localhost:27017/",
    SECRET_KEY: "alchmh1islfail",
    API_URL: "http://127.0.0.1:8545",
  },
};
export default nextConfig;
