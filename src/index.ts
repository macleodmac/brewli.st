import { extendTheme } from '@chakra-ui/react';
import { Work_Sans } from 'next/font/google';

const font = Work_Sans({
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  preload: true,
});

export const brewListTheme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'navy.600', // Set your desired font color here
      },
    },
  },
  fonts: {
    heading: font.style.fontFamily,
    body: font.style.fontFamily,
  },
  colors: {
    brown: {
      50: '#faf5f2',
      100: '#f5e6de',
      200: '#edcec2',
      300: '#e6b6a7',
      400: '#de9d8b',
      500: '#d68570',
      600: '#ca755f',
      700: '#ae604e',
      800: '#A47551',
      900: '#523A28',
    },
    // compblue: '#284052',
    navy: {
      50: '#E5E9ED',
      100: '#C3CBD3',
      200: '#A0AEB9',
      300: '#7E92A0',
      400: '#5C7686',
      500: '#3A5A6D',
      600: '#284052',
      700: '#1E313E',
      800: '#14232B',
      900: '#0A1418',
    },
  },
});

export * from './utils';
