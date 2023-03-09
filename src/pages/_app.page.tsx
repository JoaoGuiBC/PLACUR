import { Provider } from "jotai";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { globalStyles } from "../styles/globalStyles";

import Layout from "@components/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  globalStyles();

  return (
    <SessionProvider session={session}>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "pt_BR",
          url: "https://placur.site",
          siteName: "PLACUR",
        }}
      />
      <Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
