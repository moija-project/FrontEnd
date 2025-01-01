import axios, { AxiosError } from 'axios';

axios.defaults.withCredentials = true; // 쿠키를 자동으로 전송하도록 설정

const axiosUnAuth = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// AT / RT로 인증을 위한 Axios 인스턴스 생성
const axiosAuth = axios.create({
  baseURL: '/api',
  headers: {},
});

// 응답에서 새로운 AT를 추출하는 함수
const extractTokenFromHeader = (headers: any): string | null => {
  const authorizationHeader = headers['Authorization'] || headers['authorization'];
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    return authorizationHeader.split('Bearer ')[1];
  }
  return null;
};

// 요청 인터셉터: AccessToken을 요청 헤더에 추가
axiosAuth.interceptors.request.use(
  (config) => {
    const ACCESS_TOKEN = localStorage.getItem('accessToken') ?? '';
    if (ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터: AccessToken 갱신
axiosAuth.interceptors.response.use(
  (response) => {
    const newToken = extractTokenFromHeader(response.headers);
    if (newToken) {
      localStorage.setItem('accessToken', newToken);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.config) {
      const refreshToken = document.cookie.split('; ').find((row) => row.startsWith('REFRESH_TOKEN='));
      if (refreshToken) {
        try {
          const response = await axios.post('/auth/refresh', null, {
            headers: { Authorization: `Bearer ${refreshToken.split('=')[1]}` },
          });
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios.request(error.config);
        } catch (refreshError) {
          console.error('Failed to refresh token', refreshError);
          localStorage.removeItem('accessToken');
          // document.cookie = 'REFRESH_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'; // 쿠키 삭제
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export { axiosUnAuth, axiosAuth };
