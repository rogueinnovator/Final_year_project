import axios from "axios";
const BaseUrl = "http://localhost:3000";
console.log("this is base usrl", BaseUrl);
export const httpaxios = axios.create({
  baseURL: BaseUrl,
});
