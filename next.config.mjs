/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "http://localhost:3000/api/",
    MONGO_DB_URL: "mongodb://localhost:27017/",
    SECRET_KEY: "alchmh1islfail",
    API_URL: "http://127.0.0.1:8545",
    CONTRACT_ADDRESS: "0x1d3d2aC88ba9C0e6569CB6Ae0719aD56e9beAe52",
    ADDRESS: "0x7Be8337C722e43d298b524133463167beFBec66a",
    PRIVATE_KEY:"0xb9bc4cf488b0e70f6e6dec5e116c9f037c2f9bd2bf9f64db5566f550bd396bdc"
  },
};
export default nextConfig;
