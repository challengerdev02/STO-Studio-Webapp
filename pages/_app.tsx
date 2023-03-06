import type { AppProps } from 'next/app';
import '@suiet/wallet-kit/style.css';
import 'styles/metacomic-theme.css';
import 'metacomicicons/fonts/metacomic.css';
import 'styles/globals.css';
import 'styles/overrides.css';
import '../i18n';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en'; // locale-data for en
import { MainLayoutContainer } from '@/containers';
import { BaseProvider } from '../src/blockchain/base';
import { wrapper } from '@/store';
import { ReactNode } from 'react';
import { NextPage } from 'next';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { DefaultChains, WalletProvider } from '@suiet/wallet-kit';
import Head from 'next/head';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type MyAppProps = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  // @ts-ignore
  return (
    <>
      <Head>
        <title>MetaComic - comics for creators, readers and collectors</title>

        <meta
          name="description"
          content={
            'MetaComic is a platform that helps comic art creators monetize their work by connecting them with readers, fans and collectors'
          }
        />
      </Head>

      <WalletProvider chains={DefaultChains}>
        <BaseProvider>
          <GoogleReCaptchaProvider
            reCaptchaKey={String(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY)}
            scriptProps={{
              async: false,
              defer: false,
              appendTo: 'head',
              nonce: undefined,
            }}
          >
            <MainLayoutContainer>
              {getLayout(<Component {...pageProps} />)}
            </MainLayoutContainer>
          </GoogleReCaptchaProvider>
        </BaseProvider>
      </WalletProvider>
    </>
  );
}
export default wrapper.withRedux(MyApp);
