import styled from 'styled-components';

export const MainContainer = styled.main`
  & {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
    background: var(--background-secondary);
  }
`;

export const Main = styled.section`
    &{
        flex-grow: 1;
        display: flex;
        align-items: start;
        justify-content: center;
        overflow-x: visible;
        /* padding: 50px 277px!important; */
    }
    @media only screen and (min-width: 1440px) {
        & {
            //padding-top: 50px!important;
            padding-bottom: 100px!important;
            //padding-left: 50px!important;
            //padding-right: 50px!important;
        }
        
    }
  }
  @media only screen and (min-width: 1024px) and (max-width: 1439px) {
    & {
      //padding: 50px !important;
    }
  }
  @media only screen and (min-width: 480px) and (max-width: 1023px) {
    & {
      //padding: 40px !important;
    }
  }
  @media only screen and (max-width: 479px) {
    & {
      //padding: 24px !important;
    }
  }
`;
