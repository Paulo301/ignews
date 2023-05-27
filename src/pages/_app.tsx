import { AppProps } from "../../node_modules/next/app";
import { Header } from "../components/Header";

import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from "../../prismicio";

import { SessionProvider as NextAuthProvider } from "next-auth/react"

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PrismicPreview repositoryName={repositoryName}>
        <Header />
        <Component {...pageProps} />
      </PrismicPreview>
    </ NextAuthProvider>
  );
}

export default MyApp;