import routes from "../Routes";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { logUserIn } from "../Apollo";
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
import { useLocation } from "react-router";

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

const Notification = styled.div`
  margin: 10px 0 10px 0;
  color: #2ecc71;
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
  // Receive message and states from history.push after successful sign-up
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // Use username and password states received from history.push on sign-up page
      username: location?.state?.username || "",
    },
  });

  // Here, data is what the mutation returns (ok, error, token)
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };

  // [mutateFunction, { data, loading, error }]
  // mutateFunction should be called to execute the defined mutation
  const [loginFunction, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (submissionData) => {
    // Prevents login function from working in case the user clicks the button twice
    if (loading) {
      return;
    }
    // "const { username, password } = submissionData;" is also possible
    const { username, password } = getValues();
    loginFunction({
      variables: { username, password },
    });
  };

  const clearLoginErrors = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>

        <Notification>{location?.state?.message}</Notification>

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
            onChange={clearLoginErrors}
            type="text"
            placeholder="Username"
            hasError={Boolean(formState.errors?.username?.message)} // Custom prop that we use to change border color
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
          <a href={routes.home}>Log in with Facebook</a>
        </FacebookLogin>
        <ForgotPassword>
          <a href={routes.home}>Forgot Password?</a>
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
