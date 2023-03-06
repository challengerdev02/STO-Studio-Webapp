import { StyledModal } from './index.styled';
import Link from 'next/link';
import { Header, Image, LogoContainer } from '../index.styled';
import { Button, Space } from 'antd';
import { motion } from 'framer-motion';

interface FullscreenMenuProps {
  onVisibilityChange: (visible: boolean) => void;
  visibility: boolean;
  mdLogo?: string;
  smLogo?: string;
  walletAddress?: string;
}

export const FullscreenMenu = (props: FullscreenMenuProps) => {
  const { onVisibilityChange, visibility, mdLogo, walletAddress } = props;
  const links = [
    {
      label: 'Home',
      href: '/',
      icon: null,
    },
    {
      label: 'Market',
      href: '/market',
      icon: null,
    },
    // {
    //   label: 'Crowdfund',
    //   href: '/launch',
    //   icon: null,
    // },
    {
      label: 'Resources',
      href: '/resources',
      icon: null,
    },

    // {
    //   label: 'Token',
    //   href: '/token',
    //   icon: null,
    // },
  ];

  if (walletAddress) {
    links.push(
      ...[
        {
          label: 'Create',
          href: '/assets/create',
          icon: null,
        },
        {
          label: 'My Profile',
          href: '/account',
          icon: null,
        },
        // {
        //   label: 'Following',
        //   href: '/following',
        //   icon: null,
        // },
      ]
    );
  }

  return (
    <StyledModal
      title={null}
      centered
      visible={visibility}
      // onOk={() => setVisible(false)}
      onCancel={() => onVisibilityChange(false)}
      width={'100vw'}
      bodyStyle={{
        overflow: 'hidden',
        height: 'calc(100vh - 160px)',
        padding: 0,
      }}
      mask={false}
      destroyOnClose
      forceRender={false}
      footer={
        <div className="meta-flex w-100 meta-flex-col meta-menu-socials">
          <Space
            size={20}
            align={'center'}
            className={'w-100 meta-flex-center'}
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, type: 'spring', damping: 8 }}
            >
              <Button
                shape={'circle'}
                size={'small'}
                href={'https://twitter.com/metacomicart'}
                target={'_blank'}
                type={'text'}
                onClick={() => onVisibilityChange(false)}
                key={'twitter'}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill="currentColor"
                      d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"
                    />
                  </svg>
                }
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, type: 'spring', damping: 8 }}
            >
              <Button
                shape={'circle'}
                size={'small'}
                href={'https://t.me/metacomicart'}
                target={'_blank'}
                onClick={() => onVisibilityChange(false)}
                type={'text'}
                key={'discord'}
                icon={
                  <svg
                    viewBox="0 0 18 13"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.5507 0.0036464H11.5624L11.5612 0L11.5507 0.0036464ZM11.5108 0.0176323L11.5507 0.0036464H11.5252L11.5108 0.0176323ZM11.5039 0.0243315L11.5108 0.0176323L11.4917 0.0243072L11.5039 0.0243315ZM11.5039 0.0243315L11.2748 0.246719C13.8446 0.975936 15.088 2.11473 15.088 2.11473C13.4318 1.30287 11.9393 0.896938 10.4467 0.732864C9.36818 0.56879 8.28967 0.65508 7.37851 0.732864H7.13058C6.54793 0.732864 5.30826 0.975936 3.64711 1.62616C3.06818 1.87287 2.73595 2.03452 2.73595 2.03452C2.73595 2.03452 3.9781 0.816724 6.71529 0.166505L6.54793 0.00243113C6.54793 0.00243113 4.47521 -0.075352 2.2376 1.54594C2.2376 1.54594 0 5.36704 0 10.0778C0 10.0778 1.23967 12.1925 4.64008 12.2727C4.64008 12.2727 5.13595 11.6249 5.63802 11.0549C3.72893 10.4861 2.98512 9.34857 2.98512 9.34857C2.98512 9.34857 3.15124 9.42878 3.40041 9.59164H3.47479C3.50979 9.59164 3.52722 9.60778 3.54568 9.62487C3.54684 9.62595 3.548 9.62702 3.54917 9.6281V9.63539C3.56901 9.65484 3.58636 9.67185 3.62355 9.67185C3.6596 9.68642 3.69564 9.70096 3.73164 9.71548C4.10416 9.8658 4.47123 10.0139 4.77645 10.158C5.35413 10.4035 6.09669 10.6478 7.00785 10.8094C8.16074 10.9735 9.48223 11.0525 10.9872 10.8094L11.0353 10.7988L11.0353 10.7988C11.7631 10.6384 12.4908 10.4779 13.2186 10.1592C13.3516 10.0923 13.4931 10.0255 13.6419 9.95511C14.0339 9.76978 14.4769 9.56038 14.9504 9.26349C14.9504 9.26349 14.2066 10.4011 12.2169 10.9699C12.626 11.5362 13.2025 12.1852 13.2025 12.1852C15.9898 12.1255 17.3804 10.6948 17.8328 10.2295C17.9325 10.1269 17.9866 10.0713 18 10.0875C18 5.38405 15.75 1.55566 15.75 1.55566C13.7464 0.097178 11.8701 0.0257804 11.5039 0.0243315ZM6.13886 5.36701C7.00663 5.36701 7.70828 6.09623 7.70828 6.98952C7.70828 7.88889 7.00167 8.61811 6.1339 8.61811C5.26613 8.61811 4.55952 7.88889 4.55952 6.99682C4.55952 6.09745 5.26613 5.37066 6.1339 5.37066L6.13886 5.36701ZM11.7707 5.36701C12.6422 5.36701 13.3451 6.09623 13.3451 6.98952C13.3451 7.88889 12.6384 8.61811 11.7707 8.61811C10.9029 8.61811 10.1963 7.88889 10.1963 6.99682C10.1988 6.09745 10.9066 5.37066 11.7707 5.37066V5.36701Z"
                      fill="currentColor"
                    />
                  </svg>
                }
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, type: 'spring', damping: 8 }}
            >
              <Button
                shape={'circle'}
                href={'https://instagram.com/metacomicart'}
                target={'_blank'}
                size={'small'}
                type={'text'}
                onClick={() => onVisibilityChange(false)}
                key={'instagram'}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill={'currentColor'}
                      d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
                    />
                  </svg>
                }
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, type: 'spring', damping: 8 }}
            >
              <Button
                shape={'circle'}
                href={'https://t.me/metacomicart'}
                target={'_blank'}
                size={'small'}
                type={'text'}
                onClick={() => onVisibilityChange(false)}
                key={'telegram'}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill={'currentColor'}
                      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.11-8.83l.013-.007.87 2.87c.112.311.266.367.453.341.188-.025.287-.126.41-.244l1.188-1.148 2.55 1.888c.466.257.801.124.917-.432l1.657-7.822c.183-.728-.137-1.02-.702-.788l-9.733 3.76c-.664.266-.66.638-.12.803l2.497.78z"
                    />
                  </svg>
                }
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, type: 'spring', damping: 8 }}
            >
              <Button
                shape={'circle'}
                href={'https://youtube.com/metacomicaart'}
                target={'_blank'}
                size={'small'}
                onClick={() => onVisibilityChange(false)}
                type={'text'}
                key={'youtube'}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill={'currentColor'}
                      d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"
                    />
                  </svg>
                }
              />
            </motion.div>
          </Space>
          <br />
          <Space
            size={20}
            align={'center'}
            className={'w-100 meta-menu-footer-btn meta-flex-j-c'}
          >
            {!walletAddress && (
              <Link href="/connect" passHref>
                <Button
                  shape={'round'}
                  onClick={() => onVisibilityChange(false)}
                  type="primary"
                  block
                >
                  Connect Wallet
                </Button>
              </Link>
            )}
          </Space>
        </div>
      }
    >
      <Header role="menu-header">
        <Link passHref href={'/'}>
          <a>
            <LogoContainer>
              <Image
                style={{ maxWidth: '8em' }}
                // className="md-logo"
                src={mdLogo || '/assets/logo-200.png'}
                alt="MetaComic"
              />
              {/*<Image*/}
              {/*  className="sm-logo"*/}
              {/*  src={smLogo || '/icon.png'}*/}
              {/*  alt="Metacomics"*/}
              {/*/>*/}
            </LogoContainer>
          </a>
        </Link>
        <Space
          align={'center'}
          size={15}
          className="button-list-mobile mobile-list-desktop"
        >
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              className="toggle-menu"
              type="default"
              shape={'circle'}
              size={'small'}
              onClick={() => onVisibilityChange(false)}
              icon={<i className="mc-close-line" />}
            />
          </motion.div>
        </Space>
      </Header>
      {/*<br />*/}
      <Space direction={'vertical'} size={15} className={'modal-menu-links'}>
        {links.map((link, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: (index + 1) * 0.1,
                type: 'spring',
                damping: 8,
              }}
              key={link.href}
            >
              <Link passHref href={link.href}>
                <a
                  className="list-item"
                  role="link"
                  onClick={() => onVisibilityChange(false)}
                >
                  <Space size={10}>
                    {link.icon && link.icon}
                    <span>{link.label}</span>
                  </Space>
                </a>
              </Link>
            </motion.div>
          );
        })}
      </Space>
      <div style={{ padding: '5em', textAlign: 'center' }}>
        <Link href="/assets/create" passHref>
          <Button
            style={{ margin: 'auto', maxWidth: '200px' }}
            className={'m5'}
            type={walletAddress ? 'primary' : 'default'}
            shape={'round'}
            onClick={() => onVisibilityChange(false)}
            block
          >
            Create
          </Button>
        </Link>
      </div>
    </StyledModal>
  );
};
