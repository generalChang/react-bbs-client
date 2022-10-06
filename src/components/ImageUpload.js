import { PlusOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "../api/axios";
import requests from "../api/requests";

const ImageUpload = ({ updateImage }) => {
  const [image, setImage] = useState("");

  const handleImage = (files) => {
    let formData = new FormData();

    const config = {
      header: {
        "content-type": "multipart/from-data",
      },
    };

    formData.append("file", files[0]);

    axios
      .post(`${requests.api_community}/${requests.image}`, formData, config)
      .then((result) => {
        const { data } = result;
        if (data.success) {
          setImage(data.url);
          updateImage(data.url);
        } else {
          message.warning("이미지 업로드에 실패했습니다.");
        }
      })
      .catch((err) => {});
  };

  const deleteImage = () => {
    setImage("");
    updateImage("");
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: window.innerWidth > 768 ? "row" : "column",
      }}
    >
      <Dropzone onDrop={handleImage}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              style={{
                width: "300px",
                height: "240px",
                border: "1px solid gray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input {...getInputProps()} />
              <PlusOutlined style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>
      <div
        style={{
          maxWidth: "350px",
          height: "240px",
          display: "flex",
        }}
      >
        {image == "" && (
          <div
            style={{
              width: "300px",
              height: "240px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
              backgroundColor: "grey",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            미리보기 이미지
          </div>
        )}
        {image != "" && (
          <img
            style={{
              maxWidth: "300px",
              maxHeight: "240px",
              objectFit: "contain",
            }}
            alt="커뮤니티 이미지"
            src={`${requests.base_url}/${image}`}
            onClick={deleteImage}
          />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
