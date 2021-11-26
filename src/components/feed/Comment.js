import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FatText } from "../SharedComponents";

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
  }
`;

function Comment({ author, text }) {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {text.split(" ").map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
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
