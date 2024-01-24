import axios from "axios";

const BASE_URL = "http://localhost:8090";

const axiosUnAuth = axios.create({
  //   baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
const axiosAuth = axios.create({
  //   baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// axiosAuth.interceptors.request.use(
//   (config) => {
//     const TOKEN = JSON.parse(sessionStorage.getItem("user") ?? "")?.UserAtom
//       .token;
//     config.headers["Authorization"] = `Bearer ${TOKEN}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export { axiosUnAuth, axiosAuth };

// export default class AxiosInstance {
//   private static DEFAULT_URL = "http://localhost:8090";
//   private static TIME_OUT = 3000;

//   static createInstance(baseUrl?: string) {
//     return axios.create({
//       baseURL: baseUrl ? baseUrl : AxiosInstance.DEFAULT_URL,
//       timeout: AxiosInstance.TIME_OUT,
//     });
//   }
// }
