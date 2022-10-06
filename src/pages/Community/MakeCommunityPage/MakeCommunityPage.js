import React, { useState } from "react";
import { Button, Form, Input, Typography, message, Divider, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuthentication from "../../../hooks/useAuthentication";
import ImageUpload from "../../../components/ImageUpload";
import axios from "../../../api/axios";
import requests from "../../../api/requests";
const { TextArea } = Input;
const { Title } = Typography;

const MakeCommunityPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  useAuthentication(true);

  const onTitleChange = (e) => {
    const {
      target: { value },
    } = e;
    setTitle(value);
  };

  const onDescriptionChange = (e) => {
    const {
      target: { value },
    } = e;
    setDescription(value);
  };

  const updateImage = (image_url) => {
    setImage(image_url);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (title.trim() == "" || description.trim() == "" || image.trim() == "") {
      message.warning("모든 필드를 입력해주세요");
      return;
    }

    let body = {
      title,
      description,
      image,
    };

    axios
      .post(`${requests.api_community}/${requests.make_community}`, body, {
        withCredentials: true,
      })
      .then(({ data: { success } }) => {
        if (success) {
          message.success("커뮤니티 생성에 성공했습니다.");
          navigate("/", {
            replace: true,
          });
          return;
        } else {
          message.warning("커뮤니티 생성에 실패했습니다.");
          return;
        }
      })
      .catch((err) => {});
  };
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "4rem auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Title level={2}>커뮤니티 생성</Title>
      </div>

      <Form style={{ width: "90%", margin: "1rem auto" }}>
        <label style={{ fontSize: "1rem", fontWeight: "600" }}>
          커뮤니티 프로필 이미지
        </label>
        <br />

        <ImageUpload updateImage={updateImage} />
        <br />
        <Alert
          description="업로드 된 이미지를 확인할 수 있습니다. 이 영역에서 업로드된 이미지를
          클릭 시, 이미지가 지워집니다."
          type="info"
          showIcon
          closable
        />

        <Divider />
        <label style={{ fontSize: "1rem", fontWeight: "600" }}>
          커뮤니티 이름
        </label>
        <Input
          type="text"
          placeholder="커뮤니티 이름 입력..."
          value={title}
          onChange={onTitleChange}
        />
        <Divider />
        <label style={{ fontSize: "1rem", fontWeight: "600" }}>
          커뮤니티 설명
        </label>
        <TextArea
          showCount
          maxLength={100}
          placeholder="커뮤니티 설명 입력..."
          value={description}
          onChange={onDescriptionChange}
        />
        <Divider />
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          style={{ float: "right" }}
          onClick={onSubmit}
        >
          생성하기
        </Button>
      </Form>
    </div>
  );
};

export default MakeCommunityPage;
