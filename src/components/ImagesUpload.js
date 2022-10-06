import { PlusOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "../api/axios";
import requests from "../api/requests";

const ImagesUpload = ({ updateImage }) => {
  const [images, setImages] = useState([]);

  const handleImage = (files) => {
    let formData = new FormData();

    const config = {
      header: {
        "content-type": "multipart/from-data",
      },
    };

    formData.append("file", files[0]);

    axios
      .post(
        `${requests.api_writing}/${requests.upload_images}`,
        formData,
        config
      )
      .then((result) => {
        const { data } = result;
        if (data.success) {
          setImages([...images, data.url]);
          updateImage([...images, data.url]);
        } else {
          message.warning("이미지 업로드에 실패했습니다.");
        }
      })
      .catch((err) => {});
  };

  const deleteImage = (url) => {
    let newImages = [...images];

    let index = newImages.indexOf(url);

    if (index != -1) {
      newImages.splice(index, 1);
    }

    setImages(newImages);

    updateImage(newImages);
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
        {images.length === 0 && (
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
              overflowX: "scroll",
            }}
          >
            이미지 업로드시 미리보기 가능
          </div>
        )}
        {images.length > 0 &&
          images.map((image, index) => {
            return (
              <img
                style={{
                  maxWidth: "300px",
                  maxHeight: "240px",
                  objectFit: "contain",
                }}
                alt="글 이미지"
                src={`${requests.base_url}/${image}`}
                onClick={() => {
                  deleteImage(image);
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ImagesUpload;
