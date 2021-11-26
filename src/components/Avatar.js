import styled from "styled-components";

// Default avatar if user does not have a profile picture
const StyledAvatar = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: darkgray;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  max-width: 100%;
`;

function Avatar({ url = "", large = false }) {
  return (
    <StyledAvatar>{url !== "" ? <AvatarImage src={url} /> : null}</StyledAvatar>
  );
}

export default Avatar;
