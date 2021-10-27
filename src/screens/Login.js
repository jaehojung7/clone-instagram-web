import styled from "styled-components";
import { darkModeVar, isLoggedInVar } from "../Apollo";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: content;
  align-items: center;
  flex-direction: column;
  form {
    display: flex;
    justify-content: content;
    align-items: center;
    flex-direction: column;
  }
`;

const BottomBox = styled(WhiteBox)`
  padding: 10px 0px;
  text-align: center;
`;

function Login() {
  return (
    <Container>
      <div>
        <TopBox>
          <h1>Instagram</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="submit" placeholder="Log In" />
          </form>
          <span>Or</span>
          <span>Log In with Facebook</span>
        </TopBox>
        <BottomBox>
          <span>
            Don't have an account? <a href="#">Sign up</a>
          </span>
        </BottomBox>
      </div>
    </Container>
  );
}

export default Login;
