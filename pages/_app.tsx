import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
    html, body{
      padding: 0;
      margin: 0;
      font-family: 'Ubuntu', sans-serif;
    }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
