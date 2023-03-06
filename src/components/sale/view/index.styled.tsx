import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TimeBlock = styled(motion.div)`
  height: auto;
  font-weight: 500 !important;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  text-align: center;
  justify-content: center;
`;

export const TimeValue = styled(motion.span)`
  height: auto;
  //width: 100%;
  font-weight: 500 !important;
  display: flex;
  font-size: 24px;
  text-align: center;
  @media (max-width: 413px) {
    font-size: 18px;
    justify-content: center;
  }
`;

export const TimeLabel = styled(motion.span)`
  height: auto;
  width: 100%;
  justify-content: center;
  text-align: center;
  color: var(--text-color-secondary);
  font-size: 16px;
  font-weight: 500 !important;
  display: flex;
  padding: 0 !important;
  @media (max-width: 413px) {
    justify-content: center;
  }
`;

export const BolderText = styled(motion.span)`
  font-weight: bolder !important;
`;
export const BolderTextWhite = styled(motion.span)`
  font-weight: bolder !important;
  color: #ffffff;
`;
