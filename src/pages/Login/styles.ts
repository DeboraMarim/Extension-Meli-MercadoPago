import { lighten } from "polished";
import styled, { css } from "styled-components";
import { Title } from "../../components/Title";

export const Container = styled.main`
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
  width: 100%;
  height: 100vh;

  > svg {
    width: 8rem;
  }
`;

export const PageTitle = styled(Title)`
  font-size: 1.5rem;
  margin-left: 1.2rem;
  align-self: flex-start;

  &::before {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.2rem;
    left: -1.2rem;
  }
`;

export const FormContainer = styled.form`
  width: 100%;
  max-width: 400px; // Define um tamanho máximo para o formulário
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface ButtonProps {
  outlined?: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: 100%;
  max-width: 400px; // Define um tamanho máximo para o botão
  background: ${({ theme }) => theme.pink};
  color: #2e3377;
  border: none;
  border-radius: 0.3rem;
  padding: 0.3rem 0;
  transition: 0.4s;

  &:hover {
    background: ${({ theme }) => lighten(0.07, theme.pink)};
  }

  ${({ outlined }) =>
    outlined &&
    css`
      background: none;
      border: 2px solid ${({ theme }) => theme.pink};
      color: #2e3377;

      &:hover {
        background: ${({ theme }) => theme.pink};
        border-color: ${({ theme }) => theme.pink};
        color: #2e3377;
      }
    `}
`;

export const OrContainer = styled.section`
  width: 100%;
  max-width: 400px; // Define um tamanho máximo para o container "Or"
  margin: 1rem 0;
  position: relative;

  div {
    width: 100%;
    height: 3px;
    background: white;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 1;
  }

  p {
    font-size: 0.9rem;
    text-transform: uppercase;
    background: white;
    position: absolute;
    z-index: 2;
    padding: 0 1rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const ForgotPassword = styled.p`
  cursor: pointer;
  color: #007BFF;
  text-align: center;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  }
`;
