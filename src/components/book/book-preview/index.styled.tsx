import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.div<{ showInfo: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 22.5px;
  @media only screen and (max-width: 1023px) {
    & {
      flex-direction: column;
    }
  }

  .main-image-view {
    aspect-ratio: 16/9;
    width: 100% !important;

    @media screen and (min-width: 1440px) and (min-height: 900px) {
      & {
        aspect-ratio: ${(props) => (props.showInfo ? '16/9' : 'auto')};
        //padding: 10px;
        //background: var(--background-secondary);
        /* width: fit-content !important; */
      }
    }
  }

  .image-view-container:not(.thumbnail-image-view) {
    flex: 1 1 auto;
    @media screen and (max-width: 1440px) and (height: 900px) {
      & {
        //padding: 10px;
      }
    }
  }

  .thumbnail-image-view {
    aspect-ratio: 1/1;
  }

  .thumbnail-container {
    min-height: 80px;
    width: -webkit-fill-available !important;
  }
`;
export const SliderContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 65%;
  height: 100%;
  gap: 20px;

  h2 {
    font-weight: 600 !important;
    font-size: 24px !important;
    line-height: 32px !important;
    margin: 0 !important;
  }

  @media only screen and (min-width: 1024px) and (max-width: 1439px) {
    & {
      min-width: 383px;
    }
    .main-image-view {
      width: 100% !important;
      height: 440px !important;
    }
    .thumbnail-container {
      width: 100% !important;
    }
  }
  @media only screen and (min-width: 480px) and (max-width: 1023px) {
    & {
      min-width: 100% !important;
    }
    .main-image-view {
      width: 100% !important;
      height: 440px !important;
    }
    .thumbnail-container {
      width: 100% !important;
    }
  }
  @media only screen and (max-width: 479px) {
    & {
      min-width: 100% !important;
    }
    .main-image-view {
      width: 100% !important;
      height: 440px !important;
    }
    .thumbnail-container {
      width: 100% !important;
    }
  }
`;
export const InfoContainer = styled(motion.div)`
  flex-direction: column;
  width: 35%;
  border-radius: 16px;
  background-color: var(--border);
  padding: 51px 46px;
  align-items: center;
  //overflow: hidden;
  overflow-y: scroll;

  .isomorphic-tab-wrapper {
    max-width: 100% !important;
  }

  .ant-tabs-nav-list {
    width: 100%;
  }
  @media only screen and (min-width: 1024px) and (max-width: 1439px) {
    & {
      min-width: 362px;
      height: max-content;
      overflow: unset;
    }
    .isomorphic-tab-wrapper {
      width: 100% !important;
    }
  }
  @media only screen and (min-width: 480px) and (max-width: 1023px) {
    & {
      min-width: 100% !important;
      order: 1;
    }
    .isomorphic-tab-wrapper {
      width: 100% !important;
    }
  }
  @media only screen and (max-width: 479px) {
    & {
      width: 100% !important;
      order: 1;
      height: max-content;
      overflow: unset;
    }
    .isomorphic-tab-wrapper {
      width: 100% !important;
    }
  }
`;

export const ActionContainer = styled(motion.div)`
  //margin: auto;
  display: flex;
  flex-direction: column;
  width: 48px;
  gap: 20px;
  height: 100%;
  padding-top: 60px;
  .ant-btn-default {
    color: var(--text-color-secondary) !important;
    border-color: var(--text-color-secondary) !important;
  }
  @media only screen and (min-width: 480px) and (max-width: 1023px) {
    & {
      flex-direction: row;
      width: 100%;
      align-items: center;
      justify-content: center;
    }
  }
  @media only screen and (max-width: 479px) {
    padding-top: 20px;
    & {
      flex-direction: row;
      width: 100%;
      align-items: center;
      justify-content: center;
    }
  }
`;
