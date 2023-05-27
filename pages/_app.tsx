import { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import NavBar from '@src/components/NavBar/NavBar';
import { brewListTheme } from '@src/index';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <ChakraProvider theme={brewListTheme}>
        <NavBar />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
