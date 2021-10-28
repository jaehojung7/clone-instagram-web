import routes from "../routes";
import BaseBox from "../components/SharedStyles";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { darkModeVar, isLoggedInVar } from "../Apollo";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
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

const ForgotPassword = styled.div`
  a {
    color: #385285;
    font-size: 8px;
  }
`;

const Gap = styled.div`
  height: 30px;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;
function Login() {
  const { register, handleSubmit, formState, getValues, setError } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Gap></Gap>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            // No ref prop for react-hook-form v7.0.0 or above
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Minimum length of username is 5.",
              },
            })}
            type="text"
            placeholder="Username"
            hasError={Boolean(formState.errors?.username?.message)}
          />
          <Input
            {...register("password", {
              required: "Password is required.",
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.errors?.username?.message} />
          <FormError message={formState.errors?.password?.message} />
          <FormError message={formState.errors?.result?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <a href="#">Log in with Facebook</a>
        </FacebookLogin>
        <ForgotPassword>
          <a href="#">Forgot Password?</a>
        </ForgotPassword>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthLayout>
  );
}

export default Login;
