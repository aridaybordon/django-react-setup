import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://127.0.0.1:8000/api";

let authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null;

const Api = axios.create({
  baseURL: baseURL,
  responseType: "json",
  headers: {
    Authorization: `Bearer ${authTokens?.access}`,
    "Content-Type": "application/json",
  },
  timeout: 1000,
});

Api.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;

    if (!authTokens) return req;
    req.headers.Authorization = `Bearer ${authTokens?.access}`;
  }

  const user = jwt_decode(authTokens.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 0;

  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}/token/refresh/`, {
    "refresh": authTokens.refresh,
  });

  localStorage.setItem("authTokens", JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${response.data.access}`;

  return req;
});

export default Api;
