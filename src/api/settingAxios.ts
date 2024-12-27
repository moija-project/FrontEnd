import axios, { AxiosError } from 'axios';

axios.defaults.withCredentials = true;

const axiosUnAuth = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    // "Access-Control-Allow-Origin": `http://localhost:3000`,
    // "Access-Control-Allow-Credentials": true,
  },
});
const axiosAuth = axios.create({
  baseURL: '/api',
  headers: {},
});

// 응답 헤더에서 새로운 토큰을 추출하는 함수
const extractNewTokenFromHeader = (headers: any): string | null => {
  // 응답 헤더에서 토큰을 추출하고, 새로운 토큰이 있다면 반환
  const newToken = headers['Bearer-Token'];
  return newToken || null;
};

axiosAuth.interceptors.request.use(
  (config) => {
    const ACCESS_TOKEN = localStorage.getItem('accessToken') ?? '';
    try {
      if (ACCESS_TOKEN) {
        config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
      }
      return config;
    } catch (error) {
      console.error('[_axios.interceptors.request] config : ' + error);
    }
    return config;
  },
  (error: AxiosError) => {
    console.log('setting axios request ::  ', error.response?.headers);
    if (error.status) {
      localStorage.setItem('accessToken', extractNewTokenFromHeader(error.config?.headers) ?? '');
      return extractNewTokenFromHeader(error.config?.headers);
    }
    console.log('$$$$$$ 1111');
    localStorage.removeItem('accessToken');
    // useUserProfile({});
    return Promise.reject(error);
  },
);

axiosAuth.interceptors.response.use(
  (response) => {
    if (!response.data.isSuccess) {
      // 응답이 실패일 경우 처리
      const errorCode = response.data.code;

      console.log('@@@@@@@@@@@@@@@@, ', errorCode);
      // 특정 에러 코드에 따른 처리

      if (errorCode === 4006 || errorCode === 4020) {
        // 특정 에러 코드에 대한 처리 (새로운 토큰 추출 등)
        const newToken = extractTokenFromHeader(response.headers);
        if (!newToken) {
          console.log('$$$$$$ 2222');
          localStorage.removeItem('accessToken');
          // useUserProfile({});
        } else {
          // 새로운 토큰이 있는 경우 localStorage에 저장
          localStorage.setItem('accessToken', newToken);

          // 새로운 토큰을 사용하여 재시도
          return axios.request(response.config);
        }
      }

      // 특정 에러 코드에 대한 처리가 없으면 에러 반환
      return Promise.reject(new Error('Unsuccessful response'));
    }

    const newToken = extractTokenFromHeader(response.headers);
    if (newToken) {
      console.log('axios auth response :  ', newToken);
      localStorage.setItem('accessToken', newToken);
    }
    return response;
  },
  async (error: AxiosError) => {
    const newToken = extractTokenFromHeader(error.response?.headers);
    if (newToken && error.config) {
      localStorage.setItem('accessToken', newToken);
      error.config.headers.Authorization = `Bearer ${newToken}`;

      try {
        const updatedResponse = await axios.request(error.config);
        console.log('Updated Response:', updatedResponse);
        return updatedResponse;
      } catch (requestError) {
        console.log('$$$$$$ 3333');
        localStorage.removeItem('accessToken');
        // useUserProfile({});
        console.error('Failed to reattempt request:', requestError);
        return Promise.reject(requestError);
      }
    }
    console.log('$$$$$$ 4444');
    localStorage.removeItem('accessToken');
    return Promise.reject(error);
  },
);

function extractTokenFromHeader(headers: any): string | null {
  const authorizationHeader = headers['Authorization'] || headers['authorization'];
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    return authorizationHeader.split('Bearer ')[1];
  }
  return null;
}

export { axiosUnAuth, axiosAuth };
