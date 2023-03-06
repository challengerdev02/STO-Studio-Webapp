import styled from 'styled-components';

export const Container = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: center !important;

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
  }
  section {
    justify-content: center !important;
  }
  .heading {
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    letter-spacing: -0.01em;

    @media screen and (max-width: 480px) {
      font-size: 24px;
    }
  }
  .ant-image-mask {
    display: none !important;
  }
  section.main-section {
    display: flex;
    gap: 30px;
    .half {
      display: flex;
      flex-direction: column;
      gap: 64px;
    }
    .featured {
      & {
        width: 475px;
      }
      .image-view-container:not(.thumbnail-image-view),
      .thumbnail-container {
        width: 100% !important;
      }
      .image-view-container:not(.thumbnail-image-view) {
        gap: 8.5px !important;
        .main-image-view {
          height: 492px !important;
        }
      }
      .thumbnail-container {
        height: 65px !important;
        .thumbnail-image-view {
          width: 59.79px !important;
          height: 39.91px !important;
          margin-right: 6px !important;
          border-radius: 8px !important;
          img {
            border-radius: 8px !important;
          }
        }
      }
    }

    .trending {
      & {
        width: 603px;
      }
      .trending-flex {
        display: flex;
        flex-wrap: wrap;
        gap: 6px 12px;
        justify-content: center !important;

        .ant-image {
          width: 192px;
          height: 266px;
          overflow: hidden;
          border-radius: 8px;
          position: relative;
          img {
            width: auto !important;
            height: 100% !important;
            position: absolute;
            top: -9999px;
            bottom: -9999px;
            left: -9999px;
            right: -9999px;
            margin: auto;
          }
        }
      }
    }
  }

  section.mid {
    width: 1108px;
    .container {
      margin: 0 auto 50px auto;

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .navs {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
        }
      }
      .slider {
        &::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        margin: 5px auto;
        display: inline-block;
        width: 100%;
        white-space: nowrap;
        overflow-x: scroll;
        scroll-behavior: smooth;
        .main-mc-button {
          height: 330px;
          width: 256px;
          padding: 0px !important;
         
          display: block !important;
          margin-right: 28px;
        }

        .main-mc-container {
          width: 256px;
          display: inline-block;
          margin-right: 0px;
        }
      }
    }
  }

  section.tail {
    width: 1093px;
    .container {
      margin: 0px auto 18px auto;
      .ant-divider.main {
        border-color: var(--border) !important;
        margin: 30px 0px 64px 0px;
      }
      .browse-cards {
        &::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        overflow: scroll;

        .main-mc-container {
          width: 256px !important;
          display: inline-block;
          margin-right: 28px;
          margin-bottom: 20px;
        }
      }

      .filter-form {
        margin-top: 64px;

        form .mobile-mfc {
          padding-top: 20px;
          display: none;
          justify-content: start !important;
          align-items: center !important;
          gap: 10px;x.t
          flex-flow: wrap;

          .ant-row {
            margin: 0 !important;
          }

          .ant-select-selector,
          .ant-btn {
            background-color: var(--border) !important;
            border-radius: 100px !important;
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
          }
        }

        form .mfc {
          display: flex;
          justify-content: space-between !important;
          align-items: center !important;
          .ant-form-item {
            margin-bottom: 0 !important;
          }
          .half {
            display: flex;
            align-items: center !important;
            gap: 8px;
          }
          .ant-select-selector,
          .ant-btn {
            width: 135px !important;
            background-color: var(--border) !important;
            border-radius: 100px !important;
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
          }
          .ant-btn {
            width: 150px !important;
          }
          .filter-btn {
            display: flex;
            justify-content: center !important;
            gap: 6px;
            align-items: center !important;
          }
          .filter-toggle-btn {
            display: none;
          }
        }
      }
      .auto-container {
        display: flex;
        align-items: center !important;
        margin-top: 36px;
        width: 100%;
        justify-content: center !important;
        button {
          display: flex;
          align-items: center !important;
          justify-content: center !important;
          gap: 4px;
          border-radius: 90px;
          border-width: 2px !important;
          padding: 12px 16px !important;
          width: 211px;
          background-color: transparent;
          i {
            margin: 0px !important;
            padding: 0px !important;
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1440px) {
    & {
    }
  }
  @media only screen and (min-width: 1024px) and (max-width: 1439px) {
    & {
      /* grid-template-columns: 285px 619px; */
    }
    section.main-section {
      .featured {
        & {
          width: 462px;
        }
      }
      .trending {
        & {
          width: 462px;
        }
        .trending-flex {
          .ant-image {
            width: 146px;
          }
        }
      }
    }
    section.mid,
    section.tail {
      width: 940px;
    }
    section.tail {
      .mobile-mfc {
        display: flex !important;
      }
      .mobile-mfc.hide {
        display: none !important;
      }
      .filter-form {
        .left-filter {
          display: none !important;
        }
        .right-filter {
          margin-left: auto !important;
        }
        .filter-toggle-btn {
          display: flex !important;
        }
      }
    }
  }
  @media only screen and (min-width: 480px) and (max-width: 1023px) {
    & {
      /* grid-template-columns: 185px 419px; */
    }
    section.main-section {
      flex-direction: column;
      .featured {
        & {
          width: 100%;
        }
      }
      .trending {
        & {
          width: 100%;
        }
        .trending-flex {
          .ant-image {
            width: 146px;
          }
        }
      }
    }
    section.mid,
    section.tail {
      width: 94vw;
      padding: auto 3vw;
    }
    section.tail {
      .mobile-mfc {
        display: flex !important;
      }
      .mobile-mfc.hide {
        display: none !important;
      }
      .filter-form {
        form,
        .half {
          flex-flow: wrap;
          justify-content: center !important;
        }
        .half {
          margin: 10px 0 !important;
        }
        .filter-toggle-btn {
          display: flex !important;
        }
        .left-filter {
          display: none !important;
        }
        .right-filter {
          margin-left: auto !important;
        }
      }
    }
  }
  @media only screen and (max-width: 479px) {
    & {
      /* grid-template-columns: 1fr; */
    }
    section.main-section {
      flex-direction: column;
      .featured {
        & {
          width: 100%;
        }
        .thumbnail-container {
          width: 90vw !important;
        }
      }
      .trending {
        & {
          width: 100%;
        }
        .trending-flex {
          .ant-image {
            width: 114px;
          }
        }
      }
    }
    section.mid,
    section.tail {
      width: 96vw;
      padding: auto 2vw;
    }
    section.tail {
      .mobile-mfc {
        display: flex !important;
      }
      .mobile-mfc.hide {
        display: none !important;
      }
      .filter-form {
        form,
        .half {
          flex-flow: wrap;
          justify-content: center !important;
        }
        .half {
          margin: 10px 0 !important;
        }
        .filter-toggle-btn {
          display: flex !important;
        }
        .left-filter {
          display: none !important;
        }
        .right-filter {
          margin-left: auto !important;
        }
      }
    }
  }
`;
