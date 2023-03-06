import styled from 'styled-components';

export const ConnectContainer = styled.div`
  padding: 50px 24px;
  width: 100%;

  h2,
  h5 {
    text-align: center;
  }
  h5.ant-typography {
    color: var(--text-color) !important;
  }

  button {
    //background-color: transparent !important;
    font-size: 1rem !important;
    color: var(--heading-color) !important;
    font-weight: 600 !important;
    padding: 6px 24px !important;
    display: flex !important;
    align-items: center;
  }
  button:not(.ant-btn-primary) {
    background-color: transparent !important;
  }
  .ant-collapse {
    width: 100% !important;
  }

  .ant-collapse-extra {
    font-size: 20px !important;
    img {
      height: 20px !important;
    }
  }
  @media screen and (min-width: 1440px) {
    width: 50%;
    .connect-wallet-buttons-container {
      width: 40%;
    }
  }
`;
