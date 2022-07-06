import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";

config.autoAddCss = false;
library.add(fas);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraProvider>
      {router.pathname !== "/_error" ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </ChakraProvider>
  );
}

export default MyApp;
