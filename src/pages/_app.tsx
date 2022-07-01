import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";

config.autoAddCss = false;
library.add(fas);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
