import React from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import {
  AUTH_USER,
  EMAIL_CERTIFICATED,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  SEND_TMP_PASSWORD,
  SET_TMP_PASSWORD,
  UPDATE_PASSWORD,
  UPDATE_PROFILE,
} from "./types";

export function login(body) {
  const data = axios
    .post(`${requests.api_user}/${requests.login}`, body, {
      withCredentials: true,
    })
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: data,
  };
}

export function auth() {
  const data = axios
    .get(`${requests.api_user}/${requests.auth}`, {
      withCredentials: true,
    })
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: data,
  };
}

export function logout() {
  const data = axios
    .get(`${requests.api_user}/${requests.logout}`, {
      withCredentials: true,
    })
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: data,
  };
}

export function register(body) {
  const data = axios
    .post(`${requests.api_user}/${requests.register}`, body)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: data,
  };
}

export function emailCertificated(body) {
  const data = axios
    .post(`${requests.api_user}/${requests.email_certificate}`, body, {
      withCredentials: true,
    })
    .then((response) => response.data);

  return {
    type: EMAIL_CERTIFICATED,
    payload: data,
  };
}

export function sendTmpPassword(body) {
  const data = axios
    .post(`${requests.api_user}/${requests.tmp_password}`, body, {
      withCredentials: true,
    })
    .then((response) => response.data);

  return {
    type: SEND_TMP_PASSWORD,
    payload: data,
  };
}

export function setRandomlyTmpPassword(body) {
  const data = axios
    .post(`${requests.api_user}/${requests.set_tmp_password}`, body)
    .then((response) => response.data);

  return {
    type: SET_TMP_PASSWORD,
    payload: data,
  };
}

export function updatePassword(body) {
  const data = axios
    .post(`${requests.api_user}/${requests.update_password}`, body, {
      withCredentials: true,
    })
    .then((response) => response.data);

  return {
    type: UPDATE_PASSWORD,
    payload: data,
  };
}

export function updateProfile(body) {
  const data = axios
    .post(`${requests.api_user}/${requests.profile_update}`, body, {
      withCredentials: true,
    })
    .then((response) => response.data);

  return {
    type: UPDATE_PROFILE,
    payload: data,
  };
}
