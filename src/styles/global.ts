import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }
    ::-webkit-scrollbar-thumb {
     
      border-radius: 0.8rem;
    }
    ::-webkit-scrollbar-track{
      border-radius: 0.8rem;
    }
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all 0.50s linear;
    color: ${({ theme }) => theme.foreground};
  }

  body, html, #root {
    width: 100%;
    height: 100%;
  }

  body,
  input,
  textarea,
  button {
    font: 400 1rem "Poppins", sans-serif;
  }

  input {
    border: 1px solid #2e3377; /* Borda do input */
    color: ${({ theme }) => theme.foreground}; /* Cor da letra do input */
    padding: 0.5rem; /* Adicionando padding para melhorar a aparência */
    border-radius: 4px; /* Bordas arredondadas */

    ::placeholder {
      color: gray; /* Cor do placeholder */
    }

    &:focus {
      outline: none; /* Remover outline padrão ao focar */
      border-color: #2e3377; /* Manter a cor da borda ao focar */
    }
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  
  ul {
    list-style: none;
  }

  .toastContainer {
    position: absolute !important;
    padding: 0.2rem;
    font-size: 0.7rem;
  }
`;

export const PagesWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  > main {
    width: 100%;
    height: 100%;
  }
`;
