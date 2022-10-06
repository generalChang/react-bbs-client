import axios from "axios";

const useAxiosInstance = (base_url) => {
  const instance = axios.create({
    baseURL: base_url,
  });

  return instance;
};
