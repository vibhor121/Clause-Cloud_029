import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
  }

  button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;

    &:hover {
      background-color: #0056b3;
    }
  }

  input, select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyles;