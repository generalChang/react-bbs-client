import { Descriptions, Divider, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import requests from "../../../api/requests";
import useAuthentication from "../../../hooks/useAuthentication";
import dateFormater from "../../../utils/dateFormater";
import WritingComment from "./sections/WritingComment";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import LikeAndDislike from "./sections/LikeAndDislike";
const WritingDetailPage = () => {
  const { id, wid } = useParams();
  const [writing, setWriting] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [views, setViews] = useState(0);
  //커뮤니티아이디와 글아이디까지 같이 get.

  useAuthentication(null);

  const getLikes = () => {
    let body = {
      postId: wid,
    };
    axios
      .post(`${requests.api_like}/${requests.likes}`, body)
      .then(({ data }) => {
        if (data.success) {
          setLikes(data.likes.length);
        } else {
          message.warning("정보를 불러오는데 실패하였습니다.");
        }
      })
      .catch((err) => {});
  };
  const getDislikes = () => {
    let body = {
      postId: wid,
    };
    axios
      .post(`${requests.api_like}/${requests.dislikes}`, body)
      .then(({ data }) => {
        if (data.success) {
          setDislikes(data.dislikes.length);
        } else {
          message.warning("정보를 불러오는데 실패하였습니다.");
        }
      })
      .catch((err) => {});
  };
  const getWriting = () => {
    let body = {
      id: wid,
    };
    axios
      .post(`${requests.api_writing}/${requests.writing}`, body)
      .then(({ data }) => {
        if (data.success) {
          setWriting(data.writing);
        } else {
          if (data.msg) {
            message.warning(data.msg);
          } else {
            message.warning("글을 불러오지 못했습니다.");
          }
        }
      })
      .catch((err) => {});
  };

  const getComments = () => {
    let body = {
      postId: wid,
    };
    axios
      .post(`${requests.api_comment}/${requests.comments}`, body)
      .then(({ data }) => {
        if (data.success) {
          setComments(data.comments);
        } else {
          message.warning("댓글을 불러오지 못했습니다.");
        }
      })
      .catch((err) => {});
  };

  const getViews = () => {
    let body = {
      id: wid,
    };

    axios
      .post(`${requests.api_writing}/${requests.view}`, body)
      .then(({ data }) => {
        if (data.success) {
          setViews(data.views);
        } else {
          message.warning("정보를 불러오지 못했습니다.");
        }
      })
      .catch((err) => {});
  };

  const upview = () => {
    let body = {
      id: wid,
    };

    axios
      .post(`${requests.api_writing}/${requests.upview}`, body)
      .then(({ data }) => {
        if (!data.success) {
          message.warning("정보를 불러오지 못했습니다.");
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getWriting();
    getComments();
    getLikes();
    getDislikes();
    getViews();
    upview();
  }, []);

  const refreshFunction = (newComment) => {
    setComments([...comments, newComment]);
  };

  if (writing == null) {
    return <div>로딩중...</div>;
  }

  return (
    <div style={{ width: "80%", margin: "4rem auto" }}>
      <div>
        <h3>{writing.title}</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span
              style={{
                paddingRight: "0.7rem",
                borderRight: "1px solid #d2dae2",
              }}
            >
              {writing.writer.username}
            </span>
            <span style={{ paddingLeft: "0.7rem" }}>
              {dateFormater(writing.createdAt)}
            </span>
          </div>
          <div>
            <span
              style={{
                paddingRight: "0.7rem",
                borderRight: "1px solid #d2dae2",
              }}
            >
              조회수 {views}
            </span>
            <span
              style={{
                paddingRight: "0.7rem",
                paddingLeft: "0.7rem",
                borderRight: "1px solid #d2dae2",
              }}
            >
              좋아요 {likes}
            </span>
            <span
              style={{
                paddingRight: "0.7rem",
                paddingLeft: "0.7rem",
                borderRight: "1px solid #d2dae2",
              }}
            >
              싫어요 {dislikes}
            </span>
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <Viewer initialValue={writing.content || ""} />
      </div>
      <Divider />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LikeAndDislike postId={wid} />
      </div>
      <Divider />
      <WritingComment
        commentList={comments}
        postId={wid}
        refreshFunction={refreshFunction}
      />
    </div>
  );
};

export default WritingDetailPage;
