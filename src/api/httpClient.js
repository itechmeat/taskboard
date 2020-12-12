import Vue from "vue";
import axios from "axios";
import router from "@/router";
import { throttleAdapterEnhancer } from "axios-extensions";

const notifyOptions = {
  group: "api",
  type: "warn",
  duration: 5000,
};

const throttleConfig = {
  threshold: 2 * 1000,
};

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "https://api.estim8.work",
  timeout: 1000,
  headers: {
    "Cache-Control": "no-cache",
  },
  adapter: throttleAdapterEnhancer(axios.defaults.adapter, throttleConfig),
});

const getAuthToken = () => localStorage.getItem("token");

const authInterceptor = (config) => {
  config.headers["X-Auth-Token"] = getAuthToken();
  return config;
};

httpClient.interceptors.request.use(authInterceptor);

const errorInterceptor = (error) => {
  if (!error.response) {
    Vue.notify({
      ...notifyOptions,
      title: "Network/Server error",
    });
    return Promise.reject(error);
  }

  switch (error.response.status) {
    case 400:
      console.error(error.response.status, error.message);
      Vue.notify({
        ...notifyOptions,
        title: "Nothing to display",
        text: "Data Not Found",
      });
      break;

    case 401:
      // console.error(error.response.status, error.message);
      Vue.notify({
        ...notifyOptions,
        title: "Please login again",
        text: "Session Expired",
      });
      localStorage.removeItem("token");
      router.push("/");
      break;

    case 404:
      console.error(error.response.status, error.message);
      Vue.notify({
        ...notifyOptions,
        type: "error",
        title: "Something Wrong",
        text: "Endpoint Not Found",
      });
      break;

    default:
      console.error(error.response.status, error.message);
      Vue.notify({
        ...notifyOptions,
        type: "error",
        title: "Server Error",
      });
  }
  return Promise.reject(error);
};

const responseInterceptor = (response) => {
  switch (response.status) {
    case 200:
      break;
    default:
  }
  return response;
};

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;
