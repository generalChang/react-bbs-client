import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Button, message, Card, Divider, Input } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";
import requests from "../../../api/requests";
import useAuthentication from "../../../hooks/useAuthentication";
import "./LadingPage.css";
import dateFormater from "../../../utils/dateFormater";
import cut_str from "../../../utils/cutString";
const { Title } = Typography;
const { Meta } = Card;
const { Search } = Input;
const LandingPage = () => {
  const { id } = useParams(); //community의 id값 추출.
  const [community, setCommunity] = useState(null);
  const [isMyCommunity, setIsMyCommunity] = useState(false);
  const [writings, setWritings] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [isNext, setIsNext] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  useAuthentication(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);

  const getCommunity = () => {
    let body = {
      id,
    };
    axios
      .post(`${requests.api_community}/${requests.community}`, body)
      .then(({ data }) => {
        if (data.success) {
          setCommunity(data.community);
          if (data.community.manager._id == user.userData._id) {
            setIsMyCommunity(true);
          }
        } else {
          message.error("게시판을 불러오지 못했습니다.");
        }
      })
      .catch((err) => {});
  };

  const getWritings = (body) => {
    axios
      .post(`${requests.api_writing}/${requests.writings}`, body)
      .then(async ({ data }) => {
        if (data.success) {
          if (body.loadMore) {
            getLikes([...writings, ...data.writings]);
          } else {
            getLikes(data.writings);
          }
          setIsNext(data.isNext);
        } else {
          message.error("글을 불러오지 못했습니다.");
        }
      })
      .catch((err) => {});
  };

  const getLikes = async (wts) => {
    for (let a = 0; a < wts.length; a++) {
      let body = {
        postId: wts[a]._id,
      };

      const {
        data: { likes },
      } = await axios.post(`${requests.api_like}/${requests.likes}`, body);

      wts[a].likes = likes.length;
    }

    setWritings(wts);
  };

  useEffect(() => {
    if (user && user.userData) {
      getCommunity();
      getWritings({ id, skip, limit });
    }
  }, [user, user.userData]);

  const onSearch = (value) => {
    let body = {
      id,
      skip: 0,
      limit,
      searchWord: value,
    };

    getWritings(body);

    setSkip(0);
    setSearchWord(value);
  };
  const renderWritings = () => {
    return writings.map((writing, index) => {
      return (
        <tr key={index}>
          <td>
            <a
              className="writing_title"
              href={`/community/${id}/writing/${writing._id}`}
            >
              {cut_str(writing.title, 25)}
            </a>
          </td>
          <td>{writing.writer.username}</td>
          <td>{dateFormater(writing.createdAt)}</td>
          <td>{writing.likes}</td>
        </tr>
      );
    });
  };

  const onLoadMoreClick = () => {
    let body = {
      id,
      skip: skip + limit,
      limit,
      searchWord,
      loadMore: true,
    };

    getWritings(body);

    setSkip(skip + limit);
  };

  if (!community || !user || !user.userData) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ fontSize: "1.5rem" }}>로딩중...</p>
      </div>
    );
  }

  return (
    <div style={{ width: "80%", margin: "4rem auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <CommentOutlined style={{ fontSize: "2.5rem" }} />
          <span style={{ fontSize: "1.6rem", marginLeft: "0.5rem" }}>
            {community.title}
          </span>
        </div>
        {isMyCommunity && (
          <Button
            type="default"
            danger
            onClick={() => {
              navigate(`/community/update/${id}`);
            }}
          >
            수정하기
          </Button>
        )}
      </div>

      <Divider />
      {window.innerWidth > 768 && (
        <div
          className="com_container"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ width: "30%" }}>
            <img
              className="com_img"
              alt="커뮤니티이미지"
              style={{
                width: "100%",
                maxHeight: "150px",
                objectFit: "contain",
              }}
              src={`${requests.base_url}/${community.image}`}
            />
          </div>

          <div className="com_desc" style={{ width: "30%" }}>
            <p style={{ fontSize: "1rem", fontWeight: "500" }}>
              {community.description}
            </p>
          </div>
          <div className="com_managers" style={{ width: "30%" }}>
            <h3>매니저</h3>
            <p>
              {community.manager.username}({community.manager.email})
            </p>
          </div>
        </div>
      )}

      <Divider />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          type="danger"
          onClick={() => {
            message.success("인기글 로직 아직 구현 못했어 ㅋㅋ");
          }}
        >
          인기글
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: "0.5rem" }}
          onClick={() => {
            navigate(`/community/${id}/writing/upload`);
            return;
          }}
        >
          글쓰기
        </Button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}
      >
        <div>
          <Search placeholder="글 검색하기.." onSearch={onSearch} enterButton />
        </div>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr bgcolor="#1e272e" style={{ color: "white" }}>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>추천수</th>
            </tr>
          </thead>

          <tbody>{renderWritings()}</tbody>
        </table>
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {isNext && (
            <Button type="primary" onClick={onLoadMoreClick}>
              더보기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
