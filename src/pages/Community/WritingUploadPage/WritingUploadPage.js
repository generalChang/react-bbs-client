import React, { useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Button, Form, Input, Typography, message, Divider, Alert } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAuthentication from "../../../hooks/useAuthentication";

import axios from "../../../api/axios";
import requests from "../../../api/requests";
import ImagesUpload from "../../../components/ImagesUpload";
import { useRef } from "react";
const { TextArea } = Input;
const { Title } = Typography;

const WritingUploadPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const user = useSelector((state) => state.userReducer);
  const editorRef = useRef();
  useAuthentication(true);

  const onTitleChange = (e) => {
    const {
      target: { value },
    } = e;
    setTitle(value);
  };

  const onEditorChange = () => {
    const data = editorRef.current.getInstance().getHTML();

    setcontent(data);
  };

  const onUploadImage = async (blob, callback) => {
    let formData = new FormData();

    const config = {
      header: {
        "content-type": "multipart/from-data",
      },
    };

    formData.append("file", blob);

    const { data } = await axios.post(
      `${requests.api_writing}/${requests.upload_images}`,
      formData,
      config
    );

    if (data.success) {
      const url = `${requests.base_url}/${data.url}`;
      callback(url, "alt text");
      return false;
    } else {
      message.warning("업로드에 실패했습니다.");
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (title.trim() == "" || content.trim() == "") {
      message.warning("모든 필드를 입력해주세요");
      return;
    }

    let body = {
      community: id,
      title,
      content,
      writer: user.userData._id,
    };

    axios
      .post(`${requests.api_writing}/${requests.upload_writing}`, body, {
        withCredentials: true,
      })
      .then(({ data: { success } }) => {
        if (success) {
          message.success("글 작성에 성공했습니다.");
          navigate(`/community/${id}`, {
            replace: true,
          });
          return;
        } else {
          message.warning("글 작성에 실패했습니다.");
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
        <Title level={2}>포스팅</Title>
      </div>

      <Form style={{ width: "90%", margin: "1rem auto" }}>
        <Divider />
        <label style={{ fontSize: "1rem", fontWeight: "600" }}>글 제목</label>
        <Input
          type="text"
          placeholder="글 제목 입력..."
          value={title}
          onChange={onTitleChange}
        />
        <Divider />
        <label style={{ fontSize: "1rem", fontWeight: "600" }}>글 내용</label>

        <Editor
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          height="600px"
          plugins={[colorSyntax]}
          language="ko-KR"
          ref={editorRef}
          onChange={onEditorChange}
          hooks={{
            addImageBlobHook: onUploadImage,
          }}
        />
        <Divider />
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          style={{ float: "right" }}
          onClick={onSubmit}
        >
          작성하기
        </Button>
      </Form>
    </div>
  );
};

export default WritingUploadPage;
