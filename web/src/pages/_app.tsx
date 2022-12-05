import Head from 'next/head'
import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/globalStyles'

export default function App({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <>
      <Head>
        <title>EGEPE</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}
