import { message, Alert, Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import { emailCertificated } from "../_actions/user_action";
const { Title } = Typography;
const EmailAuthenticationPage = () => {
  useAuthentication(null);
  const [authCode, setAuthCode] = useState("");
  const location = useLocation();
  const user = useSelector((state) => state.userReducer);
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onAuthCodeChange = (e) => {
    const {
      target: { value },
    } = e;
    setAuthCode(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!authCode) {
      message.warning("인증번호를 입력해주세요");
      return;
    }

    let myEmail = user.userData.email || email;

    let body = {
      email: myEmail,
      authCode,
    };

    dispatch(emailCertificated(body))
      .then((result) => {
        const {
          payload: { success },
        } = result;

        if (success) {
          message.success("이메일 인증에 성공했습니다.");
          navigate("/", {
            replace: true,
          });
          return;
        } else {
          if (result.payload.msg) {
            message.warning(result.payload.msg);
          } else {
            message.warning("이메일 인증에 실패했습니다.");
          }
        }
      })
      .catch((err) => {});
  };
  return (
    <div
      style={{
        width: "85%",
        margin: "4rem auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Title level={2}>Authentication</Title>
      </div>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <div style={{ maxWidth: "380px" }}>
          <Alert
            message="이메일인증"
            description="이메일로 인증번호를 발송했습니다. 확인하시고 인증번호를 입력해주세요"
            type="info"
            showIcon
            closable
          />
          <Form
            style={{ marginTop: "1rem" }}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
          >
            <Form.Item
              label="인증번호"
              name="인증번호"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="input authcode..."
                onChange={onAuthCodeChange}
                value={authCode}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={onSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EmailAuthenticationPage;
