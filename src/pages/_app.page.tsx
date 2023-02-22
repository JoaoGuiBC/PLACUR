import Head from 'next/head'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { globalStyles } from '../styles/globalStyles'

import Layout from '@components/Layout'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  globalStyles()

  return (
    <SessionProvider session={session}>
      <Head>
        <title>EGEPE</title>
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
