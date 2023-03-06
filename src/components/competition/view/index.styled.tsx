import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: var(--background-secondary);
`;

export const ImageSection = styled.figure`
  width: 100%;
  position: absolute;
  height: 20rem;
  overflow: hidden;
  img.comp-banner {
    display: block;
    width: 100%;
  }
  .comp-banner-overlay {
    max-height: 30rem;
    height: 30rem;
    display: flex;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
  }
`;

export const CompetitionHeaderSection = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
  margin: 10rem 5rem 5rem 5rem;
  border-radius: 50px;
  background-color: var(--background-primary);
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media screen and (max-width: 768px) {
    margin: 10rem 10px 10px 10px;
    border-radius: 10px;
  }
  @media screen and (max-width: 1024px) {
    margin: 10rem 20px 20px 20px;
    border-radius: 20px;
  }

  .comp-thumbnail {
    height: 250px;
    width: 250px;
    border-radius: 10px;
  }
  .competition-title-section {
    display: flex;
    //align-items: center;
    justify-content: center;
    flex-direction: column;
    h1.competition-title {
      text-align: start;
      font-size: 2.5rem;
      font-weight: 600;
      margin: 0 !important;
    }
    h5.competition-title-info {
      font-size: 1.5rem;
      color: var(--text-color-secondary) !important;
    }
  }
  .com-timeline {
    .anticon {
      font-size: 1.5em !important;
      margin-top: 5px !important;
    }
    margin-bottom: 10px !important;
  }
  .comp-intro {
    width: 100%;
    font-size: 1rem;

    @media screen and (max-width: 480px) {
      text-align: center;
      padding-bottom: 2rem;
    }
  }
  .comp-headlines {
    .comp-headlines-title {
      font-size: 1.5rem;
    }
    h2 {
      font-size: 1.2rem;
    }
    font-size: 1rem;
    margin-bottom: 1.5em;
  }
`;

export const CompetitionBodySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;

  .comp-headlines-series {
    display: flex !important;
    flex-wrap: wrap !important;
  }
  @media screen and (max-width: 480px) {
    .ant-col {
      padding-left: 20px !important;
      padding-right: 20px !important;
    }

    .comp-headlines-series {
      //display: flex;
      width: 100%;
    }
  }
`;
