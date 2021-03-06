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

const NewCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const NewCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

function Comments({ photoId, author, caption, commentNumber, comments }) {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues, formState } = useForm();
  const createCommentUpdate = (cache, result) => {
    const { text } = getValues();
    setValue("text", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: String(Date.now()),
        id,
        isMine: true,
        text,
        user: {
          ...userData.me,
        },
      };

      const newCommentCache = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment newCommentFragment on Comment {
            id
            createdAt
            isMine
            text
            user {
              username
              avatar
            }
          }
        `,
      });

      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev) {
            return [...prev, newCommentCache];
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentFunction, { loading }] = useMutation(
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
    createCommentFunction({
      variables: {
        photoId,
        text,
      },
    });
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
          id={comment.id}
          photoId={photoId}
          author={comment.user.username}
          text={comment.text}
          isMine={comment.isMine}
        />
      ))}
      <NewCommentContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <NewCommentInput
            {...register("text", {
              required: "Comment cannot be empty.",
            })}
            type="text"
            placeholder="Write a comment"
            hasError={Boolean(formState.errors?.text?.message)}
          />
        </form>
      </NewCommentContainer>
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