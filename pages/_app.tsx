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
import { ReactNode, useMemo } from 'react';
// import { NextPage } from 'next';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { DefaultChains, WalletProvider } from '@suiet/wallet-kit';
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  UnsafeBurnerWalletAdapter,
  TorusWalletAdapter,
  SolletWalletAdapter,
  SolflareWalletAdapter,
  SlopeWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { SessionProvider } from 'next-auth/react';
import {
  WalletModalProvider,
  // WalletDisconnectButton,
  // WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import Head from 'next/head';
require('@solana/wallet-adapter-react-ui/styles.css');

// type Page<P = {}> = NextPage<P> & {
//   getLayout?: (page: ReactNode) => ReactNode;
// };

type MyAppProps = AppProps & {
  Component: any;
  pageProps: any;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new UnsafeBurnerWalletAdapter(),
      new TorusWalletAdapter(),
      new SolletWalletAdapter(),
      new SolflareWalletAdapter(),
      new SlopeWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [network]
  );

  // @ts-ignore
  return (
    <>
      <Head>
        <title>Satoshi Studio - nft on bitcoin</title>

        <meta
          name="description"
          content={'Satoshi Studio is an nft marketplace for bitcoin ordinals'}
        />
      </Head>

      <ConnectionProvider endpoint={endpoint}>
        <SolanaWalletProvider wallets={wallets} autoConnect>
          <WalletProvider chains={DefaultChains}>
            <BaseProvider>
              <WalletModalProvider>
                <SessionProvider
                  session={pageProps.session}
                  refetchInterval={0}
                >
                  <GoogleReCaptchaProvider
                    reCaptchaKey={String(
                      process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY
                    )}
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
                </SessionProvider>
              </WalletModalProvider>
            </BaseProvider>
          </WalletProvider>
        </SolanaWalletProvider>
      </ConnectionProvider>
    </>
  );
}
export default wrapper.withRedux(MyApp);
