import styled, { keyframes } from 'styled-components';

export const rotate = keyframes`
  0% {
    fill: var(--text-color);
  }

  70% {
    fill: var(--text-color);
  }

  100% {
    fill: var(--background-primary);
  }
`;
export const StyledLoader = styled.span.attrs((props: { rate: number }) => ({
  rate: props.rate,
  role: props.rate,
}))`
  & {
    display: flex !important;
  }
  svg {
    path {
      animation: ${rotate} ${(props) => props.rate}s linear infinite;
    }
    path:nth-child(1) {
      animation-delay: ${(props) => ((props.rate ?? 1) / 8) * 1}s;
    }
    path:nth-child(5) {
      animation-delay: ${(props) => ((props.rate ?? 1) / 8) * 2}s;
    }
    path:nth-child(3) {
      animation-delay: ${(props) => ((props.rate ?? 1) / 8) * 3}s;
    }
    path:nth-child(7) {
      animation-delay: ${(props) => ((props.rate ?? 1) / 8) * 4}s;
    }
    path:nth-child(2) {
      animation-delay: ${(props) => ((props.rate ?? 1) / 8) * 5}s;
    }
    path:nth-child(6) {
      animation-delay: ${(props) => ((props.rate ?? 1) / 8) * 6}s;
    }
    path:nth-child(4) {
      animation-delay: ${(props) => ((props.rate ?? 1) / 8) * 7}s;
    }
    path:nth-child(8) {
      animation-delay: ${(props) => props.rate ?? 1}s;
    }
  }
`;
