import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Provider as JotaiProvider } from 'jotai'
import { QueryClientProvider } from '@tanstack/react-query'

import '@lib/dayjs'
import Layout from '@components/Layout'
import { queryClient } from '@lib/react-query'

import { globalStyles } from '../styles/globalStyles'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  globalStyles()

  return (
    <SessionProvider session={session}>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: 'https://placur.site',
          siteName: 'PLACUR',
        }}
      />

      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </JotaiProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
