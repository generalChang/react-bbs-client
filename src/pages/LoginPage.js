import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, message } from "antd";
import axios from "../api/axios";
import requests from "../api/requests";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import { useDispatch } from "react-redux";
import { login } from "../_actions/user_action";
const { Title } = Typography;
const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useAuthentication(false);
  const onEmailChange = (e) => {
    const {
      target: { value },
    } = e;

    setEmail(value);
  };

  const onPasswordChange = (e) => {
    const {
      target: { value },
    } = e;

    setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() == "" || password.trim() == "") {
      message.warning("모든 항목을 입력해주세요");
      return;
    }

    let body = {
      email,
      password,
    };

    dispatch(login(body))
      .then((result) => {
        const { payload } = result;

        if (payload.success) {
          message.success("로그인에 성공했습니다.");
          navigate("/", {
            replace: true,
          });
          return;
        } else {
          if (payload.msg) {
            message.warning(`${payload.msg}`);
          } else {
            message.warning("로그인에 실패했습니다.");
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
        <Title level={2}>Login</Title>
      </div>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Form name="basic">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="input email..."
              onChange={onEmailChange}
              value={email}
            />
          </Form.Item>

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
            <a style={{ float: "right" }} href="/password/reset">
              Forgot password?
            </a>
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
            or <a href="/register">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
