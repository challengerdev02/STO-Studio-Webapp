import styled from 'styled-components';
import { Divider } from 'antd';

export const Meta = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: var(--heading-color);
  margin: -10px -30px;
`;

export const Line = styled(Divider)`
  height: 1px;
  border: 1px solid var(--border-color);
  width: 100%;
`;

export const MobileLine = styled(Divider)`
  height: 1px;
  border: 1px solid var(--border);
  width: 100%;
  display: none !important;

  @media (max-width: 750px) {
    display: block !important;
  }
`;

export const Div = styled.div`
  font-size: 16px;
  color: var(--adm-color-white);
`;

export const Wrapper = styled.footer`
  width: 100%;
  padding: 80px 160px 0;
  background: var(--background-primary) !important;

  @media screen and (min-width: 760px) and (max-width: 1024px) {
    padding: 80px 80px 0;
  }

  @media (max-width: 750px) {
    padding: 40px 20px;
  }
`;

export const DesktopImg = styled.img`
  width: 200px;
  height: 180px;
  margin: -30px 0 0 -40px;
`;

export const Creator = styled.div`
  font-size: 24px;
  color: var(--text-color);
  margin: 32px 0 0;
  width: 100%;

  @media (max-width: 750px) {
    margin: 0;
    min-width: 300px;
  }
`;

export const ColWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  margin-top: 40px;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0;

  @media (max-width: 750px) {
    justify-content: center;
  }
`;

export const Text = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--text-color-secondary);
  cursor: pointer;
`;

export const BottomText = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: var(--text-color-secondary);
`;

export const BottomTextRight = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const LogoDiv = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
`;

export const RDiv = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;

  @media screen and (min-width: 760px) and (max-width: 1024px) {
    justify-content: space-between;
  }

  @media (max-width: 750px) {
    flex-direction: column;
  }

  .last {
    margin-left: 100px;

    @media screen and (min-width: 760px) and (max-width: 1024px) {
      margin: 0;
    }

    @media (max-width: 750px) {
      margin: 0;
    }
  }
`;

export const LDiv = styled.div`
  margin-right: 222px;

  @media screen and (min-width: 760px) and (max-width: 1024px) {
    margin: 0;
  }
`;

export const EndDiv = styled.div`
  @media (max-width: 750px) {
    display: none;
  }
`;
