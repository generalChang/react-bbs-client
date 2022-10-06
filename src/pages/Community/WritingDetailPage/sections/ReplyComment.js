import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

const ReplyComment = ({
  parrentCommendId,
  postId,
  commentList,
  refreshFunction,
}) => {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    commentList.map((comment, index) => {
      if (comment.responseTo == parrentCommendId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  });
  const onReplyView = () => {
    setOpenReplyComments(!openReplyComments);
  };
  const renderReplies = () => {
    return commentList.map((comment, index) => {
      return (
        comment.responseTo == parrentCommendId && (
          <div>
            <SingleComment
              postId={postId}
              comment={comment}
              refreshFunction={refreshFunction}
            />
            <ReplyComment
              refreshFunction={refreshFunction}
              parrentCommendId={comment._id}
              commentList={commentList}
              postId={postId}
            />
          </div>
        )
      );
    });
  };
  return (
    <div style={{ marginLeft: "40px" }}>
      {childCommentNumber > 0 && (
        <p style={{ fontSize: "14px", color: "gray" }} onClick={onReplyView}>
          답글 {childCommentNumber}개 더보기
        </p>
      )}
      {openReplyComments && renderReplies()}
    </div>
  );
};

export default ReplyComment;
