import React, { useEffect } from 'react';
import { Container, PageTitle, FormContainer, Button, OrContainer } from "../Login/styles";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { HookFormInput } from "../../components/HookFormInput";
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().required('Email is a required field').matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Enter a valid email address'
  ),
  password: Yup.string().required('Password is a required field')
});

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSignUp(form: FormData) {
    await register(form);
  }

  function handleLogin() {
    navigate("/login");
  }

  useEffect(() => {
    document.title = 'Sign Up';
  }, []);

  return (
    <Container>
      <PageTitle>Cadastre-se</PageTitle>
      <FormContainer onSubmit={handleSubmit(handleSignUp)}>
        <HookFormInput
          icon={<HiOutlineMail />}
          label="Email"
          placeholder="your@email.com"
          control={control}
          id="email"
          type="email"
          error={errors.email && errors.email.message}
        />
        <HookFormInput
          icon={<HiOutlineLockClosed />}
          label="Password"
          placeholder="your password"
          control={control}
          id="password"
          type="password"
          error={errors.password && errors.password.message}
        />

        <Button type="submit">
          Sign Up
        </Button>

        <OrContainer>
          <div>
            <p>Or</p>
          </div>
        </OrContainer>
        <Button outlined onClick={handleLogin}>
          Login
        </Button>
      </FormContainer>
    </Container>
  );
}
