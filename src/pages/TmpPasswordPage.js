import { Button, Form, Input, Typography, message, Tooltip, Alert } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import { setRandomlyTmpPassword } from "../_actions/user_action";
const { Title } = Typography;
const TmpPasswordPage = () => {
  const dispatch = useDispatch();
  useAuthentication(false);
  const { id } = useParams();
  function generateRandomPassword() {
    return Math.floor(Math.random() * 10 ** 8)
      .toString()
      .padStart("0", 8);
  }

  const handleTmpPassword = () => {
    const tmpPw = generateRandomPassword();

    let body = {
      id,
      password: tmpPw,
    };

    dispatch(setRandomlyTmpPassword(body))
      .then((result) => {
        const {
          payload: { success },
        } = result;
        if (success) {
          setTmpPassword(tmpPw);
        } else {
          if (result.payload.msg) {
            message.warning(result.payload.msg);
          } else {
            message.warning("임시비밀번호 변경에 실패했습니다.");
          }
        }
      })
      .catch((err) => {});
  };
  const [tmpPassword, setTmpPassword] = useState("");
  useEffect(() => {
    handleTmpPassword();
  }, []);
  return (
    <div
      style={{
        width: "85%",
        margin: "4rem auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Title level={2}>임시비밀번호</Title>
      </div>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <div style={{ maxWidth: "380px" }}>
          <Alert
            message="임시비밀번호 확인"
            description="임시비밀번호가 발급되었습니다. 로그인을 진행한 뒤, 비밀번호를 변경하세요."
            type="info"
            showIcon
            closable
          />

          <p>임시비밀번호 : {tmpPassword}</p>
        </div>
      </div>
    </div>
  );
};

export default TmpPasswordPage;
