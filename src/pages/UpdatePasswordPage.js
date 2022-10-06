import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, message, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import { useDispatch } from "react-redux";
import { updatePassword } from "../_actions/user_action";
const { Title } = Typography;
const UpdatePasswordPage = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useAuthentication(true);

  const onPasswordChange = (e) => {
    const {
      target: { value },
    } = e;

    setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password.trim() == "") {
      message.warning("모든 항목을 입력해주세요");
      return;
    }

    let body = {
      password,
    };

    dispatch(updatePassword(body))
      .then((result) => {
        const {
          payload: { success },
        } = result;
        if (success) {
          message.success("비밀번호 변경에 성공했습니다!");
          navigate("/", {
            replace: true,
          });
        } else {
          if (result.payload.msg) {
            message.warning(result.payload.msg);
          } else {
            message.warning("비밀번호 변경에 실패했습니다.");
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
        <Title level={2}>비밀번호변경</Title>
      </div>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <div style={{ maxWidth: "380px" }}>
          <Alert
            message="비밀번호변경"
            description="비밀번호를 변경해주세요"
            type="info"
            showIcon
            closable
          />
          <Form name="basic" style={{ marginTop: "1rem" }}>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="input password..."
                onChange={onPasswordChange}
                value={password}
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="login-form-button"
                type="primary"
                htmlType="submit"
                onClick={onSubmit}
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
