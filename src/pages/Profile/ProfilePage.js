import { ProfileFilled } from "@ant-design/icons";
import { Button, Divider } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useAuthentication from "../../hooks/useAuthentication";
import { Gender } from "../../datas/gender";
import { useNavigate } from "react-router-dom";
import requests from "../../api/requests";
const ProfilePage = () => {
  useAuthentication(true);

  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);
  if (!user || !user.userData) {
    return <div>로딩중..</div>;
  }
  return (
    <div style={{ margin: "4rem auto", width: "80%" }}>
      <div style={{ display: "flex" }}>
        <ProfileFilled style={{ fontSize: "2rem" }} />
        <h3>내 프로필</h3>
      </div>
      <Divider />
      <div style={{ padding: "1.2rem" }}>
        <label>
          <strong>프로필이미지</strong>
        </label>
        <br />
        <div>
          <img
            src={
              user.userData.imageUpdated
                ? `${requests.base_url}/${user.userData.image}`
                : user.userData.image
            }
            alt="프로필이미지"
            style={{
              maxWidth: "300px",
              maxHeight: "240px",
              objectFit: "contain",
            }}
          />
        </div>
        <Divider />
        <label>
          <strong>이름</strong>
        </label>
        <p>{user.userData.username}</p>
        <Divider />
        <label>
          <strong>나이</strong>
        </label>
        <p>{user.userData.age}</p>
        <Divider />
        <label>
          <strong>성별</strong>
        </label>
        <p>
          {Gender.map((gender) => {
            return gender.value == user.userData.gender && gender.label;
          })}
        </p>
        <Divider />
        <Button
          type="primary"
          onClick={() => {
            navigate("/profile/update", {
              replace: true,
            });
          }}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
