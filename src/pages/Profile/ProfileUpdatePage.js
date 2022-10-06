import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Typography,
  message,
  Radio,
  InputNumber,
  Divider,
} from "antd";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Gender } from "../../datas/gender";
import useAuthentication from "../../hooks/useAuthentication";
import ImageUpload from "../../components/ImageUpload";
import { updateProfile } from "../../_actions/user_action";

const { Title } = Typography;

const ProfileUpdatePage = () => {
  const user = useSelector((state) => state.userReducer);

  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState(0);
  const [age, setAge] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useAuthentication(true);

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

  const updateImage = (image_url) => {
    setImage(image_url);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() == "" || !age) {
      message.warning("모든 항목을 입력해주세요");
      return;
    }

    let body = {
      imageUpdated: image != "",
      username,
      gender,
      age,
      image,
    };

    dispatch(updateProfile(body))
      .then((result) => {
        const { payload } = result;

        if (payload.success) {
          message.success("프로필 수정에 성공했습니다.");
          navigate("/profile", {
            replace: true,
          });
          return;
        } else {
          message.warning("프로필 수정에 실패했습니다.");
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (user && user.userData) {
      setImage(user.userData.imageUpdated ? user.userData.image : "");
      setUsername(user.userData.username);
      setGender(user.userData.gender);
      setAge(user.userData.age);
    }
  }, [user]);
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "4rem auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Title level={2}>프로필 업데이트</Title>
      </div>

      <Form style={{ width: "90%", margin: "1rem auto" }}>
        <label style={{ fontSize: "1rem", fontWeight: "600" }}>
          프로필 이미지
        </label>
        <br />
        <ImageUpload updateImage={updateImage} />
        <br />

        <Divider />
        <label style={{ fontSize: "1rem", fontWeight: "600" }}>유저이름</label>
        <Input
          type="text"
          placeholder="유저 이름 입력..."
          value={username}
          onChange={onUsernameChange}
        />
        <Divider />

        <label style={{ fontSize: "1rem", fontWeight: "600" }}>나이</label>
        <br />
        <InputNumber min={1} max={120} value={age} onChange={onAgeChange} />
        <Divider />
        <label style={{ fontSize: "1rem", fontWeight: "600" }}>성별</label>
        <br />
        <Radio.Group onChange={onGenderChange} value={gender}>
          {Gender.map((g) => {
            return <Radio value={g.value}>{g.label}</Radio>;
          })}
        </Radio.Group>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          style={{ float: "right" }}
          onClick={onSubmit}
        >
          수정하기
        </Button>
      </Form>
    </div>
  );
};

export default ProfileUpdatePage;
