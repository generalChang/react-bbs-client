import React from "react";
import useAuthentication from "../../../hooks/useAuthentication";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Row, Col, Button, message, Card, Input } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import requests from "../../../api/requests";
import axios from "../../../api/axios";
import cut_str from "../../../utils/cutString";
const { Meta } = Card;
const { Search } = Input;
const MyPage = () => {
  useAuthentication(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);
  const [communitys, setCommunitys] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [isNext, setIsNext] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const getCommunitys = (body) => {
    axios
      .post(`${requests.api_community}/${requests.communitys}`, body)
      .then(({ data }) => {
        if (data.success) {
          if (body.loadMore) {
            setCommunitys([...communitys, ...data.communitys]);
          } else {
            setCommunitys(data.communitys);
          }
          setIsNext(data.isNext);
        } else {
          message.warning("커뮤니티 정보를 불러오지 못했습니다.");
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (user && user.userData) {
      let body = { skip, limit, userId: user.userData._id };
      getCommunitys(body);
    }
  }, [user, user.userData]);

  const renderCommunitys = () => {
    return communitys.map((community, index) => {
      return (
        <Col key={index} lg={6} md={12} xs={24}>
          <a href={`/community/${community._id}`}>
            <Card
              hoverable
              cover={
                <img
                  alt="커뮤니티 이미지"
                  src={`${requests.base_url}/${community.image}`}
                  style={{
                    width: "100%",
                    height: "150px",
                    maxHeight: "150px",
                    objectFit: "contain",
                  }}
                />
              }
            >
              <Meta
                title={cut_str(community.title, 15)}
                description={cut_str(community.description, 15)}
              />
            </Card>
          </a>
        </Col>
      );
    });
  };

  const onLoadMoreClick = () => {
    let body = {
      skip: skip + limit,
      limit,
      searchWord,
      userId: user.userData._id,
      loadMore: true,
    };

    getCommunitys(body);

    setSkip(skip + limit);
  };

  const onSearch = (value) => {
    let body = {
      skip: 0,
      limit,
      userId: user.userData._id,
      searchWord: value,
    };

    getCommunitys(body);

    setSkip(0);
    setSearchWord(value);
  };
  return (
    <div style={{ width: "80%", margin: "4rem auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <CommentOutlined style={{ fontSize: "2.5rem" }} />
          <span style={{ fontSize: "1.6rem", marginLeft: "0.5rem" }}>
            내 커뮤니티
          </span>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}
      >
        <div>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </div>
      </div>
      <div style={{ marginTop: "3rem" }}>
        <Row gutter={[16, 16]}>{renderCommunitys()}</Row>
      </div>
      <div
        style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}
      >
        {isNext && (
          <Button type="primary" onClick={onLoadMoreClick}>
            더보기
          </Button>
        )}
      </div>
    </div>
  );
};

export default MyPage;
