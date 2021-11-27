import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Comment from "./Comment";
import { gql, useMutation } from "@apollo/client";
import useUser from "../../hooks/useUser";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $text: String!) {
    createComment(photoId: $photoId, text: $text) {
      ok
      error
      id
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
  const { register, handleSubmit, setValue, formState, getValues } = useForm();
  const { data: userData } = useUser();

  const createCommentUpdate = (cache, result) => {
    const { text } = getValues();
    setValue("text", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;

    if (ok && userData.me) {
      const newComment = {
        createdAt: Date.now(),
        id,
        isMine: true,
        text,
        user: {
          ...userData.me,
        },
      };
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev) {
            return [...prev, newComment];
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );

  const onSubmitValid = (data) => {
    const { text } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
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
