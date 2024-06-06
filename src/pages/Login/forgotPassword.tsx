import React, { useEffect } from 'react';
import { Container, PageTitle, FormContainer, Button } from "./styles";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { HookFormInput } from "../../components/HookFormInput";
import { HiOutlineMail } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface FormData {
  email: string;
}

const schema = Yup.object().shape({
  email: Yup.string().required('Email is a required field').matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Enter a valid email address'
  )
});

export function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  async function handleResetPassword(form: FormData) {
    await resetPassword(form.email);
    navigate("/login");
  }

  function handleBackToLogin() {
    navigate("/login");
  }

  useEffect(() => {
    document.title = 'Forgot Password';
  }, []);

  return (
    <Container>
      <PageTitle>Forgot Password</PageTitle>
      <FormContainer onSubmit={handleSubmit(handleResetPassword)}>
        <HookFormInput
          icon={<HiOutlineMail />}
          label="Email"
          placeholder="your@email.com"
          control={control}
          id="email"
          type="email"
          error={errors.email && errors.email.message}
        />
        <Button type="submit">
          Reset Password
        </Button>
      </FormContainer>
      <Button outlined onClick={handleBackToLogin}>
        Back to Login
      </Button>
    </Container>
  );
}
