import routes from "../routes";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/PageTitle";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Subtitle = styled.h3`
  font-weight: 600;
  font-size: 12px;
  color: #8e8e8e;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
  line-height: 18px;
`;

const FacebookLogin = styled.div`
  display: flex;
  align-items: center;
  color: #385285;
  margin-bottom: 15px;
  a {
    color: #385285;
    margin-left: 7px;
    font-weight: 600;
  }
`;

function SignUp() {
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <FontAwesomeIcon icon={faInstagram} size="3x" />
        <Subtitle>Sign up to see photos and videos from your friends.</Subtitle>
        <Button type="submit" value="Log in with Facebook" />
        <Separator />
        <form>
          <Input type="text" placeholder="Mobile number or Email" />
          <Input type="text" placeholder="Full Name" />
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" value="Sign up" />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
}

export default SignUp;
