import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import requests from "../api/requests";
import { auth } from "../_actions/user_action";

const useAuthentication = (option) => {
  //option null : 로그인 여부와 상관없음.
  //option false : 로그인을 안한사용자만 출입가능,
  /// option true : 로그인을 반드시 해야함.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authentication = async () => {
    dispatch(auth())
      .then((result) => {
        const {
          payload: { isAuth, emailCertificated, passwordReset },
        } = result;
        if (emailCertificated === false) {
          //아직 이메일 인증을 하지 않은 사용자라면

          navigate("/email/auth", {
            replace: true,
          });
          return;
        }

        if (passwordReset) {
          //패스워드를 리셋해서 임시비밀번호를 부여받은 상태라면
          navigate("/update/password", {
            replace: true,
          });
          return;
        }
        if (option) {
          if (!isAuth) {
            // 서비스에 대한 접근 권한이 없다면.
            message.warning("로그인을 해주시기 바랍니다.");
            navigate("/login", {
              replace: true,
            });
            return;
          }
        } else {
          if (option === false) {
            if (isAuth) {
              message.warning("로그아웃 후 사용해주시기 바랍니다.");
              navigate("/", {
                replace: true,
              });
              return;
            }
          }
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    authentication();
  }, []);

  return auth;
};

export default useAuthentication;
