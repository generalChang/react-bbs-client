import { Avatar, Comment, message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../../api/axios";
import requests from "../../../../api/requests";

const SingleComment = ({ comment, postId, refreshFunction }) => {
  const [openReply, setOpenReply] = useState(false);
  const [content, setcontent] = useState("");

  const onReplyopenClick = () => {
    setOpenReply((prev) => !prev);
  };
  const actions = [<span onClick={onReplyopenClick}>답글쓰기</span>];
  const user = useSelector((state) => state.userReducer);
  if (!comment || !postId) {
    return <div>로딩중...</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (content.trim() == "") {
      message.warning("댓글을 입력하세요");
      return;
    }

    let body = {
      postId,
      content,
      writer: user.userData._id,
      responseTo: comment._id,
    };
    axios
      .post(`${requests.api_comment}/${requests.save_comment}`, body, {
        withCredentials: true,
      })
      .then(({ data }) => {
        if (data.success) {
          message.success("작성에 성공했습니다.");
          refreshFunction(data.comment);
          setcontent("");
          setOpenReply(false);
        } else {
          message.warning("작성에 실패했습니다.");
        }
      })
      .catch((err) => {});
  };

  const onContentChange = (e) => {
    const {
      target: { value },
    } = e;
    setcontent(value);
  };
  return (
    <div>
      <Comment
        actions={actions}
        author={comment.writer.username}
        content={<p>{comment.content}</p>}
      />

      {openReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            style={{ width: "80%", borderRadius: "3px", height: "52px" }}
            value={content}
            onChange={onContentChange}
            placeholder="댓글을 입력해주세요.."
          />
          <button style={{ width: "20%" }} onClick={onSubmit}>
            작성하기!
          </button>
        </form>
      )}
    </div>
  );
};

export default SingleComment;
