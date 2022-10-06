import axios from "axios";
import requests from "./requests";

const instance = axios.create({
  baseURL: requests.base_url,
});

export default instance;
