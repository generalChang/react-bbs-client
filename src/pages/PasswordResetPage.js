import { message, Alert, Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import { emailCertificated, sendTmpPassword } from "../_actions/user_action";
const { Title } = Typography;
const PasswordResetPage = () => {
  useAuthentication(false);
  const [isSendTmpPassword, setIsSendTmpPassword] = useState(false);
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onEmailChange = (e) => {
    const {
      target: { value },
    } = e;
    setEmail(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      message.warning("이메일을 입력해주세요");
      return;
    }

    let body = {
      email,
    };

    dispatch(sendTmpPassword(body))
      .then((result) => {
        const {
          payload: { success },
        } = result;

        if (success) {
          setIsSendTmpPassword(true);
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
        <Title level={2}>비밀번호 변경</Title>
      </div>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <div style={{ maxWidth: "380px" }}>
          {!isSendTmpPassword && (
            <Alert
              message="비밀번호 변경"
              description="이메일을 입력하시면 임시비밀번호를 수신받을 수 있습니다."
              type="info"
              showIcon
              closable
            />
          )}
          {isSendTmpPassword && (
            <Alert
              message="이메일확인"
              description="입력하신 이메일로 임시비밀번호를 발급받을 수 있는 페이지를 발송했습니다. 확인해주세요."
              type="success"
              showIcon
              closable
            />
          )}
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
              label="email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="input email..."
                onChange={onEmailChange}
                value={email}
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

export default PasswordResetPage;
