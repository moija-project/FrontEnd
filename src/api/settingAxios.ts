import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { getCookie } from "../utils/cookie";
import { useRecoilValue } from "recoil";
import { getAccessTokenState } from "../store/userStore";

const BASE_URL = "http://mo.ija.kro.kr/";
axios.defaults.withCredentials = true;

const axiosUnAuth = axios.create({
  // baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
const axiosAuth = axios.create({
  // baseURL: BASE_URL,
  headers: {
    // "Content-Type": "application/json",
  },
});

// 응답 헤더에서 새로운 토큰을 추출하는 함수
const extractNewTokenFromHeader = (headers: any): string | null => {
  // 응답 헤더에서 토큰을 추출하고, 새로운 토큰이 있다면 반환
  const newToken = headers["Bearer-Token"]; // 예시로 'new-token' 헤더에서 새로운 토큰을 추출하는 것으로 가정합니다.
  return newToken || null;
};

axiosAuth.interceptors.request.use(
  (config) => {
    const ACCESS_TOKEN = localStorage.getItem("accessToken") ?? "";
    try {
      if (ACCESS_TOKEN) {
        config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
      } else config.headers.Authorization = ``;
      return config;
    } catch (error) {
      console.error("[_axios.interceptors.request] config : " + error);
    }
    return config;
  },
  (error: AxiosError) => {
    if (error.status === 401) {
      localStorage.setItem(
        "accessToken",
        extractNewTokenFromHeader(error.config?.headers) ?? ""
      );
      return extractNewTokenFromHeader(error.config?.headers);
    }
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { response: errorResponse } = error;
    const originalRequest = error.config;

    if (errorResponse?.status === 401) {
      console.log("#### ---", errorResponse?.status);
      localStorage.setItem(
        "accessToken",
        extractNewTokenFromHeader(originalRequest?.headers) ?? ""
      );
      return extractNewTokenFromHeader(originalRequest?.headers);
    }
    return Promise.reject(error);
  }
);

export { axiosUnAuth, axiosAuth };
