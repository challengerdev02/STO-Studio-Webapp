import styled from 'styled-components';

export const OutterContainer = styled.div`
  & {
    display: flex;
    gap: 20px;
    flex-direction: column;
    width: 80%;
    padding-top: 10px;
  }
  .ant-image-mask {
    width: 100% !important;
    height: 100% !important;
    opacity: 0 !important;
  }
  @media only screen and (max-width: 1439px) {
    & {
      width: 100%;
      padding: 24px;
    }
  }

  @media only screen and (min-width: 1440px) {
    & {
      padding-top: 50px;
    }
  }
`;

export const Container = styled.div`
  .sale-asset-price-container {
    .ant-space-item {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .ant-space.w-100 {
    > .ant-space-item {
      width: 100%;
    }
  }
  & {
    display: grid;
    //column-gap: 56px;
    //row-gap: 40px;
    gap: 20px;
    /* grid-template-columns: 285px 606px; */
    grid-template-columns: repeat(12, 1fr);
    //width: 100%;
  }
  .ant-tag-geekblue {
    background: var(--accent2) !important;
    border-color: var(--accent) !important;
    padding: 5px !important;
  }
  .sell-scene-container {
    display: flex;
    gap: 20px;
    //grid-area: 2 / 2 / 2 / 3;
    overflow: hidden;
    overflow-x: auto;
    width: 50vw;

    &::-webkit-scrollbar {
      width: 0px;
      background: transparent; /* make scrollbar transparent */
    }
  }

  .image-container,
  .image-container-mobile {
    display: flex;
    flex-direction: column;
    grid-column: 1/5;

    .image-wrapper {
      grid-column: 1/5;

      width: 100%;
      .image-wrapper-header {
        border: 1.5px solid var(--border);
        border-bottom: 0;
        border-top-left-radius: 12px !important;
        border-top-right-radius: 12px !important;
      }

      .image-wrapper-header-like-btn {
        &:hover {
          color: var(--accent-red);
        }
        .liked {
          color: var(--accent-red);
        }
      }
      img {
        border: 1.5px solid var(--border);
        border-top: 0;
        border-radius: 0 !important;
        border-bottom-left-radius: 12px !important;
        border-bottom-right-radius: 12px !important;
        border-bottom: 1.5px solid var(--border);

        //aspect-ratio: 1/1; // TODO: Find adaptive aspect ratio
      }
      .image-view-container {
        width: 100% !important;
      }
      .ant-image {
        width: 100%;
      }
    }
  }

  .image-container-mobile {
    display: none;
  }
  .book-details-main-container {
    display: flex;
    flex-direction: column;
    grid-column: 5/13;

    .info-title {
      font-weight: 700;
      //font-size: 40px;
      line-height: 48px;
      margin-bottom: 2px;
      letter-spacing: -0.01em;
      width: 100%;
    }
  }
  .book-details-scene-container {
    width: 100%;
  }

  .attribute-container {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 20px;
    width: 100%;
    //margin-left: 5px;

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      font-size: 14px;
      gap: 4px;
      line-height: 20px;

      .left {
        color: var(--text-color-secondary) !important;
      }

      .right {
        color: var(--text-color-secondary) !important;
        text-align: right;
      }
    }

    .heading {
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;

      .ant-typography {
        color: var(--heading-color) !important;
      }

      .ant-btn {
        width: 26px !important;
        min-width: auto !important;
        padding: 0px !important;
        border: 0px !important;
        height: 26px !important;
        color: var(--text-color-secondary) !important;
      }
    }
  }
  @media only screen and (max-width: 1439px) {
    & {
      width: 100%;
      //background: red;
      display: flex;
      flex-direction: column;
    }

    .image-container {
      display: none;
    }

    .image-container-mobile {
      display: flex;
    }
    .sell-scene-container {
      width: 100%;
    }
  }
`;
