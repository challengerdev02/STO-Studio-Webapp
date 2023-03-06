import styled from 'styled-components';
import { Button, Drawer, Form, Input } from 'antd';
import React, { useState } from 'react';
import BG from '../../../../public/assets/mobile-menu-drawer-bg.svg';
import Logo from '../../../../public/assets/logo-dark.svg';
import Link from 'next/link';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const MobileDrawerMenu = (props: Props) => {
  const { visible, onClose } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => {
    onClose();
    setShow(!show);
  };

  const [form] = Form.useForm();

  return (
    <Wrapper
      placement="left"
      onClose={onClose}
      visible={visible}
      drawerStyle={{
        backgroundImage: `url(${BG})`,
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        padding: 20,
      }}
      headerStyle={{ display: 'none' }}
      contentWrapperStyle={{ height: '100vh' }}
      data-testid={'mobile-drawer-menu'}
    >
      <Top>
        <Close type="link" onClick={handleClose} data-testid="close-icon">
          {!show ? (
            <i className="mc-close-line" style={{ fontSize: 20 }} />
          ) : (
            <i className="mc-burger-line mc-2x" />
          )}
        </Close>

        <div style={{ marginLeft: -50 }}>
          <Img src={Logo} alt="logo" />
          <Span onClick={onClose}>MetaComic</Span>
        </div>
      </Top>

      <Form form={form} size="small">
        <Form.Item>
          <Input
            placeholder="Item, Collection, Artist"
            suffix={<i className="mc-search-line" style={{ fontSize: 20 }} />}
          />
        </Form.Item>
      </Form>

      <Wraps>
        <Text>
          <Link href={'/'}>Collect</Link>
        </Text>

        <Text>
          <Link passHref href="/resources">
            <a data-testid="res">Resources</a>
          </Link>
        </Text>

        <Text>
          <Link href="/assets/create">Create</Link>
        </Text>
      </Wraps>
    </Wrapper>
  );
};

const Wrapper = styled(Drawer)``;

const Img = styled.img`
  margin-top: -10px;
`;

const Top = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 50px;
  margin-bottom: 64px;
`;

const Wraps = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
`;

const Span = styled.span`
  margin-left: -75px;
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
`;

const Text = styled.div`
  font-size: 40px !important;
  font-weight: 700 !important;
  color: var(--header-text-color) !important;

  a {
    color: var(--header-text-color) !important;
  }
`;

const Close = styled(Button)`
  color: var(--color-white) !important;
  z-index: 10;
`;
