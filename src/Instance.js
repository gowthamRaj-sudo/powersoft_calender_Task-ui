import axios from "axios";
// export const baseUrl = "http://192.168.101.73:8080";
export const baseUrl = "http://localhost:8080";
export const instance = axios.create({
  baseURL: baseUrl,
});
