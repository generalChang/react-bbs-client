import { Divider, message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../../api/axios";
import requests from "../../../../api/requests";
import ReplyComment from "./ReplyComment";
import SingleComment from "./SingleComment";

const WritingComment = ({ commentList, postId, refreshFunction }) => {
  const user = useSelector((state) => state.userReducer);
  const [comment, setComment] = useState("");

  const renderComments = () => {
    if (commentList == null) {
      return;
    }
    return commentList.map((comment, index) => {
      return (
        !comment.responseTo && (
          <div>
            <SingleComment
              comment={comment}
              postId={postId}
              refreshFunction={refreshFunction}
            />
            <ReplyComment
              commentList={commentList}
              postId={postId}
              refreshFunction={refreshFunction}
              parrentCommendId={comment._id}
            />
          </div>
        )
      );
    });
  };

  const onContentChange = (e) => {
    const {
      target: { value },
    } = e;
    setComment(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (comment.trim() == "") {
      message.warning("댓글을 입력하세요");
      return;
    }

    let body = {
      postId,
      writer: user.userData._id,
      content: comment,
    };
    axios
      .post(`${requests.api_comment}/${requests.save_comment}`, body, {
        withCredentials: true,
      })
      .then(({ data }) => {
        if (data.success) {
          message.success("작성에 성공했습니다.");
          refreshFunction(data.comment);
          setComment("");
        } else {
          message.warning("작성에 실패했습니다.");
        }
      })
      .catch((err) => {});
  };
  return (
    <div>
      <h3>전체댓글</h3>

      {renderComments()}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "80%", borderRadius: "3px", height: "52px" }}
          value={comment}
          onChange={onContentChange}
          placeholder="댓글을 입력해주세요.."
        />
        <button style={{ width: "20%" }} onClick={onSubmit}>
          작성하기!
        </button>
      </form>
    </div>
  );
};

export default WritingComment;
