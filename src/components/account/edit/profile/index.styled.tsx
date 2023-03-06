//Create a styled component for image background overlay
import styled from 'styled-components';

export const ImageOverlay = styled.div<any>`
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) =>
    props.width ? props.width : props.size ? props.size : '100%'};
  height: ${(props) =>
    props.height ? props.height : props.size ? props.size : '100%'};
  z-index: 1;
  transition: 0.25s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => (props.shape === 'circle' ? '50%' : '0')};
  i {
    color: #fff;
    font-size: 2rem;
    opacity: 0;
    transition: 0.25s ease-in-out;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: visible;
    i {
      opacity: 1;
    }
  }
`;

export const ImagePlaceholder = styled.div<any>`
  width: ${(props) =>
    props.width ? props.width : props.size ? props.size : '100%'};
  height: ${(props) =>
    props.height ? props.height : props.size ? props.size : '100%'};
  position: absolute;
  top: 0;

  .meta-image-placeholder-box {
    background: var(--background-primary);
    width: 100%;
    height: 100%;
    border-radius: 12px;
    opacity: 0.6;
  }
`;
