/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "http://localhost:3000/api",
    MONGO_DB_URL: "mongodb://localhost:27017/",
    SECRET_KEY: "alchmh1islfail",
    API_URL: "http://127.0.0.1:7545",
    CONTRACT_ADDRESS: "0xc205c59bcA54ecDf8C7395C98D007E167DC5e178",
    ADDRESS: "0x40f0DFEdb5133Dc47f11231f1A96C6BB4949eac1",
    PRIVATE_KEY: "0xe2c646bf413991b9ec3ab1f7b2ed9af57ccc35502d8e23a342d52ac5278a44e6",
    ROOT_PATH: "/home/rogue/Desktop/Final_year_project/"
  },
};
export default nextConfig;
