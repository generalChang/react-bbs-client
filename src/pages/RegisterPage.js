import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Typography,
  message,
  Radio,
  InputNumber,
} from "antd";
import { Gender } from "../datas/gender";
import axios from "../api/axios";
import requests from "../api/requests";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import { useDispatch } from "react-redux";
import { register } from "../_actions/user_action";
import moment from "moment";

const { Title } = Typography;

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState(0);
  const [age, setAge] = useState(10);

  const dispatch = useDispatch();
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

  const onGenderChange = (e) => {
    const {
      target: { value },
    } = e;
    setGender(value);
  };

  const onUsernameChange = (e) => {
    const {
      target: { value },
    } = e;

    setUsername(value);
  };

  const onAgeChange = (value) => {
    setAge(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      email.trim() == "" ||
      password.trim() == "" ||
      username.trim() == "" ||
      !age
    ) {
      message.warning("모든 항목을 입력해주세요");
      return;
    }

    let body = {
      email,
      password,
      username,
      gender,
      age,
      image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
    };

    dispatch(register(body))
      .then((result) => {
        const {
          payload: { success },
        } = result;
        if (success) {
          // message.success("회원가입에 성공하셨습니다.");
          // navigate("/", {
          //   replace: true,
          // });
          // return;

          navigate(`/email/auth?email=${result.payload.email}`, {
            replace: true,
          });
          return;
        } else {
          message.warning("회원가입에 실패했습니다.");
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
        <Title level={2}>Register</Title>
      </div>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Form
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
            label="password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="input password..."
              onChange={onPasswordChange}
              value={password}
            />
          </Form.Item>

          <Form.Item
            label="username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="input username..."
              onChange={onUsernameChange}
              maxLength={15}
              value={username}
            />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Radio.Group onChange={onGenderChange} value={gender}>
              {Gender.map((g) => {
                return <Radio value={g.value}>{g.label}</Radio>;
              })}
            </Radio.Group>
          </div>

          <Form.Item
            style={{ marginTop: "1rem" }}
            label="age"
            name="age"
            rules={[
              {
                required: true,
                message: "Please input your age!",
              },
            ]}
          >
            <InputNumber
              placeholder={age}
              onChange={onAgeChange}
              min={1}
              max={120}
              value={age}
            />
          </Form.Item>

          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
