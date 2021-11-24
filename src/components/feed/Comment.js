import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import sanitizeHtml from "sanitize-html";

const CommentContainer = styled.div`
  boldText {
    font-weight: 700;
  }
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  mark {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    text-decoration: underline;
  }
`;

function Comment({ author, text }) {
  const sanitizedText = sanitizeHtml(
    text.replace(/#[\w]+/g, "<mark>$&</mark>"),
    { allowedTags: ["mark"] }
  );
  return (
    <CommentContainer>
      <boldText>{author}</boldText>
      <CommentCaption>
        {text.split(" ").map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word}</React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Comment;
