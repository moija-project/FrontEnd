import { isLoggedInState } from "./../store/userStore";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { getCookie } from "../utils/cookie";
import { useRecoilState, useRecoilValue } from "recoil";
import { getAccessTokenState } from "../store/userStore";
import useUserProfile from "../hook/useUserProfile";

axios.defaults.withCredentials = true;

const axiosUnAuth = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
const axiosAuth = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL,
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
      }
      // else config.headers.Authorization = ``;
      return config;
    } catch (error) {
      console.error("[_axios.interceptors.request] config : " + error);
    }
    return config;
  },
  (error: AxiosError) => {
    console.log("setting axios request ::  ", error.response?.headers);
    if (error.status === 401 || error.status === 500) {
      localStorage.setItem(
        "accessToken",
        extractNewTokenFromHeader(error.config?.headers) ?? ""
      );
      return extractNewTokenFromHeader(error.config?.headers);
    }
    localStorage.removeItem("accessToken");
    useUserProfile({});
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.response.use(
  (response) => {
    console.log("axios auth response : ", response.data);
    // if (!response.data.isSuccess) {
    //   localStorage.removeItem("accessToken");
    //   console.log("*** , ", response.headers);
    //   return Promise.reject(new Error("Unsuccessful response"));
    // }

    if (!response.data.isSuccess) {
      // 응답이 실패일 경우 처리
      const errorCode = response.data.code;

      // 특정 에러 코드에 따른 처리
      switch (errorCode) {
        case 4006:
        case 4020:
          // 특정 에러 코드에 대한 처리 (새로운 토큰 추출 등)
          const newToken = extractTokenFromHeader(response.headers);
          if (!newToken) {
            localStorage.removeItem("accessToken");
            useUserProfile({});
          }
          else {
            // 새로운 토큰이 있는 경우 localStorage에 저장
            localStorage.setItem("accessToken", newToken);

            // 새로운 토큰을 사용하여 재시도
            return axios.request(response.config);
          }
          break;
        default:
          // 기타 처리
          break;
      }

      // 특정 에러 코드에 대한 처리가 없으면 에러 반환
      return Promise.reject(new Error("Unsuccessful response"));
    }

    const newToken = extractTokenFromHeader(response.headers);
    if (newToken) {
      console.log("axios auth response :  ", newToken);
      localStorage.setItem("accessToken", newToken);
    }
    return response;
  },
  async (error: AxiosError) => {
    // if (
    //   error.response?.status === 503 ||
    //   error.response?.status === 500 ||
    //   error.response?.status === 401
    // ) {
    const newToken = extractTokenFromHeader(error.response?.headers);
    if (newToken && error.config) {
      localStorage.setItem("accessToken", newToken);
      error.config.headers.Authorization = `Bearer ${newToken}`;

      try {
        const updatedResponse = await axios.request(error.config);
        console.log("Updated Response:", updatedResponse);
        return updatedResponse;
      } catch (requestError) {
        localStorage.removeItem("accessToken");
        useUserProfile({});
        console.error("Failed to reattempt request:", requestError);
        return Promise.reject(requestError);
      }
    }
    // }
    console.log("erorrrrrr : " , error.response?.status );    
    return Promise.reject(error);
  }
);

function extractTokenFromHeader(headers: any): string | null {
  const authorizationHeader =
    headers["Authorization"] || headers["authorization"];
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    return authorizationHeader.split("Bearer ")[1];
  }
  return null;
}

// axiosAuth.interceptors.response.use(
//   (response) => {
//     // 응답에서 토큰 추출
//     const authorizationHeader = response.headers["Authorization"];
//     if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
//       const newToken = authorizationHeader.split("Bearer ")[1];

//       // 추출한 토큰을 로컬 스토리지에 저장하거나, 상태 관리 라이브러리를 사용하여 저장
//       localStorage.setItem("accessToken", newToken);

//       // 추출한 토큰을 다음 요청의 헤더에 추가
//       axiosAuth.defaults.headers["Authorization"] = `Bearer ${newToken}`;
//     }

//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export { axiosUnAuth, axiosAuth };
