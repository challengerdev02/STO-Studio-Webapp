import React from 'react';
import {
  Bottom,
  BottomText,
  BottomTextRight,
  ColWrap,
  Creator,
  DesktopImg,
  Div,
  EndDiv,
  LDiv,
  Line,
  LogoDiv,
  Meta,
  MobileLine,
  RDiv,
  Text,
  Wrapper,
} from './index.styled';
import Script from 'next/script';
import Link from 'next/link';
import CookieConsent from 'react-cookie-consent';
import { Button } from 'antd';

interface FooterProps {
  imgSrc: string;
}

export const Footer = ({ imgSrc }: FooterProps) => {
  return (
    <Wrapper>
      <CookieConsent
        cookieName={'@@metacomics/gdpr'}
        buttonClasses={'meta-cookie-btn'}
        style={{
          background: 'var(--background-primary)',
          boxShadow: '0 -3px 20px rgba(0, 0, 0, 0.25)',
        }}
        enableDeclineButton
        declineButtonClasses={'meta-cookie-btn meta-cookie-btn-decline'}
        buttonText={'Accept'}
        declineButtonText={'Decline'}
        debug={process.env.NODE_ENV === 'development'}
      >
        We use essential cookies to make our site work. With your consent, we
        may also use non-essential cookies to improve user experience and
        analyze website traffic. By clicking “Accept,“ you agree to our
        website&apos;s cookie use as described in our{' '}
        <Link href={process.env.NEXT_PUBLIC_PRIVACY_POLICY as string}>
          Privacy Policy
        </Link>
        . You can change your cookie settings at any time by clicking
        “Preferences.”
      </CookieConsent>
      <RDiv>
        <LDiv>
          <LogoDiv>
            <DesktopImg src={imgSrc} alt="logo" />

            <Meta>MetaComic</Meta>
          </LogoDiv>
          <Creator>For Creators and Collectors</Creator>
        </LDiv>

        <MobileLine />

        <Div>
          MetaComic
          <ColWrap>
            <a
              target={'_blank'}
              href="https://metacomic.tawk.help/"
              rel="noreferrer"
            >
              <Text>Support</Text>
            </a>
            <a
              target={'_blank'}
              href="https://zw25dm9hb9k.typeform.com/to/RPjfbMqq"
              rel="noreferrer"
            >
              <Text>Become a Creator</Text>
            </a>
            <a
              target={'_blank'}
              href="https://metacomic.tawk.help/"
              rel="noreferrer"
            >
              <Text>Getting Started</Text>
            </a>
            <a target={'_blank'} href="https://metacomic.com" rel="noreferrer">
              <Text>About</Text>
            </a>
          </ColWrap>
        </Div>

        <MobileLine />

        <Div className="last">
          Community
          <ColWrap>
            <a
              target={'_blank'}
              href="https://t.me/metacomicart"
              rel="noreferrer"
            >
              <Text>Telegram</Text>
            </a>
            <a
              target={'_blank'}
              href="https://twitter.com/metacomicart"
              rel="noreferrer"
            >
              <Text>Twitter</Text>
            </a>
            <a
              target={'_blank'}
              href="https://www.instagram.com/metacomicart"
              rel="noreferrer"
            >
              <Text>Instagram</Text>
            </a>
            <a
              target={'_blank'}
              href="https://www.reddit.com/r/metacomicart"
              rel="noreferrer"
            >
              <Text>Reddit</Text>
            </a>
          </ColWrap>
        </Div>
      </RDiv>

      <Line />

      <Bottom>
        <BottomText>Copyright © 2022 MetaComic. All rights reserved</BottomText>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG}');
        `}
        </Script>
        <EndDiv>
          <BottomTextRight>
            <Link
              passHref
              href={process.env.NEXT_PUBLIC_PRIVACY_POLICY as string}
            >
              <Button type="link" target={'_blank'} style={{ padding: 0 }}>
                Privacy Policy
              </Button>
            </Link>
            <Link
              passHref
              href={process.env.NEXT_PUBLIC_TERMS_OF_SERVICE as string}
            >
              <Button type="link" target={'_blank'} style={{ padding: 0 }}>
                Terms of Service
              </Button>
            </Link>
          </BottomTextRight>
        </EndDiv>
      </Bottom>
    </Wrapper>
  );
};
