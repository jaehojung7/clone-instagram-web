import routes from "../routes";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import FormError from "../components/auth/FormError";

const Subtitle = styled.h3`
  font-weight: 600;
  font-size: 12px;
  color: #8e8e8e;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
  line-height: 18px;
`;

const FacebookLoginButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 3px;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  span {
    margin-left: 5px;
  }
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const history = useHistory();

  // Here, data is what the mutation returns (ok, error)
  const onCompleted = (data) => {
    const { username } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    } else {
      history.push(routes.home, {
        message: "Account created. Please log in.",
        username,
      });
    }
  };

  const [createAccountFunction, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const { register, handleSubmit, formState, getValues, setError } = useForm({
    mode: "onChange",
  });

  const onSubmitValid = (data) => {
    // Prevents createAccount function from working in case the user clicks the button twice
    if (loading) {
      return;
    }
    // Alternative: skip getValues and createAccount({ ... data })
    // In this case, we already know data contains all necessary fields if submission is valid
    // However, manual fetching with getValues is safer in general
    const { firstName, lastName, username, email, password } = getValues();
    createAccountFunction({
      variables: {
        firstName,
        lastName,
        username,
        email,
        password,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <FontAwesomeIcon icon={faInstagram} size="3x" />
        <Subtitle>Sign up to see photos and videos from your friends.</Subtitle>
        <FacebookLoginButton href="#">
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLoginButton>
        <Separator />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", {
              required: "First name is required.",
            })}
            type="text"
            placeholder="First Name"
            hasError={Boolean(formState.errors?.firstName?.message)}
          />
          <Input
            {...register("lastName")}
            type="text"
            placeholder="Last Name"
          />
          <Input
            {...register("email", {
              required: "Email is required.",
            })}
            type="text"
            placeholder="Email"
            hasError={Boolean(formState.errors?.email?.message)}
          />
          <Input
            {...register("username", {
              required: "Username is required.",
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
          <FormError message={formState.errors?.firstName?.message} />
          <FormError message={formState.errors?.email?.message} />
          <FormError message={formState.errors?.username?.message} />
          <FormError message={formState.errors?.password?.message} />
          <FormError message={formState.errors?.result?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
}

export default SignUp;
