import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Comment from "./Comment";
import { gql, useMutation } from "@apollo/client";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $text: String!) {
    createComment(photoId: $photoId, text: $text) {
      ok
      error
    }
  }
`;

const CommentsContainer = styled.div`
  margin-top: 20px;
`;
const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;

function Comments({ photoId, author, caption, commentNumber, comments }) {
  const [createCommentFunction, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION
  );
  const { register, handleSubmit, setValue, formState } = useForm();
  const onSubmitValid = (data) => {
    const { text } = data;
    if (loading) {
      return;
    }
    createCommentFunction({
      variables: {
        photoId,
        text,
      },
    });
    setValue("text", "");
  };
  return (
    <CommentsContainer>
      <Comment author={author} text={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          text={comment.text}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <input
            {...register("text", {
              required: "Comment cannot be empty.",
            })}
            type="text"
            placeholder="Write a comment"
            hasError={Boolean(formState.errors?.text?.message)}
          />
        </form>
      </div>
    </CommentsContainer>
  );
}

Comments.propTypes = {
  photoId: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
  commentNumber: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }),
      text: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default Comments;
