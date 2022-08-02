import axios from "axios";

const instance = axios.create({
  baseURL: "http://43.200.6.110",
  // baseURL: "http://localhost:5001",
  // baseURL: "http://spartawoong.shop",
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('TOKEN');
  config.headers.common['Authorization'] = `${accessToken}`;
  return config;
})

export default instance;