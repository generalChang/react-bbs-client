import React from "react";
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import { Button, message, Tooltip } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../../../api/axios";
import requests from "../../../../api/requests";
import { useSelector } from "react-redux";
const LikeAndDislike = ({ postId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const user = useSelector((state) => state.userReducer);
  const getLikes = () => {
    let body = {
      postId,
    };
    axios
      .post(`${requests.api_like}/${requests.likes}`, body)
      .then(({ data }) => {
        if (data.success) {
          let isLiked = false;
          data.likes.forEach((like) => {
            if (like.userId == user.userData._id) {
              isLiked = true;
            }
          });
          setLiked(isLiked);
          setLikes(data.likes.length);
        } else {
          message.warning("정보를 불러오는데 실패하였습니다.");
        }
      })
      .catch((err) => {});
  };
  const getDislikes = () => {
    let body = {
      postId,
    };
    axios
      .post(`${requests.api_like}/${requests.dislikes}`, body)
      .then(({ data }) => {
        if (data.success) {
          let isdisLiked = false;
          data.dislikes.forEach((dislike) => {
            if (dislike.userId == user.userData._id) {
              isdisLiked = true;
            }
          });
          setDisliked(isdisLiked);
          setDislikes(data.dislikes.length);
        } else {
          message.warning("정보를 불러오는데 실패하였습니다.");
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (postId && user.userData) {
      getLikes();
      getDislikes();
    }
  }, [postId, user]);

  const onLikeClick = () => {
    let body = {
      userId: user.userData._id,
      postId,
    };

    if (liked) {
      //이미 좋아요를 눌렀었다면
      //클릭시 좋아요가 줄어들어야함.
      axios
        .post(`${requests.api_like}/${requests.unlike}`, body, {
          withCredentials: true,
        })
        .then(({ data }) => {
          if (data.success) {
            message.success("좋아요를 취소하였습니다.");
            setLiked(false);
            setLikes((prev) => prev - 1);
          } else {
            message.warning("좋아요를 취소하지 못했습니다.");
          }
        })
        .catch((err) => {});
    } else {
      axios
        .post(`${requests.api_like}/${requests.uplike}`, body, {
          withCredentials: true,
        })
        .then(({ data }) => {
          if (data.success) {
            message.success("좋아요를 성공하였습니다.");
            setLiked(true);
            setLikes((prev) => prev + 1);
          } else {
            message.warning("좋아요를 성공하지 못했습니다.");
          }
        })
        .catch((err) => {});
    }
  };

  const onDislikeClick = () => {
    let body = {
      userId: user.userData._id,
      postId,
    };

    if (disliked) {
      //이미 싫어요를 눌렀었다면
      //클릭시 싫어요가 줄어들어야함.
      axios
        .post(`${requests.api_like}/${requests.undislike}`, body, {
          withCredentials: true,
        })
        .then(({ data }) => {
          if (data.success) {
            message.success("싫어요를 취소하였습니다.");
            setDisliked(false);
            setDislikes((prev) => prev - 1);
          } else {
            message.warning("싫어요를 취소하지 못했습니다.");
          }
        })
        .catch((err) => {});
    } else {
      axios
        .post(`${requests.api_like}/${requests.updislike}`, body, {
          withCredentials: true,
        })
        .then(({ data }) => {
          if (data.success) {
            message.success("싫어요를 성공하였습니다.");
            setDisliked(true);
            setDislikes((prev) => prev + 1);
          } else {
            message.warning("싫어요를 성공하지 못했습니다.");
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <div>
      <Tooltip key="comment-basic-like" title="Like">
        <Button type={liked ? "primary" : "default"} onClick={onLikeClick}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {liked ? (
              <LikeFilled
                style={{ fontSize: "1.2rem", marginRight: "0.3rem" }}
              />
            ) : (
              <LikeOutlined
                style={{ fontSize: "1.2rem", marginRight: "0.3rem" }}
              />
            )}

            <span className="comment-action">{likes}</span>
          </div>
        </Button>
      </Tooltip>

      <Tooltip key="comment-basic-dislike" title="Dislike">
        <Button type={disliked ? "danger" : "default"} onClick={onDislikeClick}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {disliked ? (
              <DislikeFilled
                style={{ fontSize: "1.2rem", marginRight: "0.3rem" }}
              />
            ) : (
              <DislikeOutlined
                style={{ fontSize: "1.2rem", marginRight: "0.3rem" }}
              />
            )}

            <span className="comment-action">{dislikes}</span>
          </div>
        </Button>
      </Tooltip>
    </div>
  );
};

export default LikeAndDislike;
