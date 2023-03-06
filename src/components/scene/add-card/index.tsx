import { StyledI, AddInfo, AddDiv, Text, Wrapper } from './index.styled';
import { motion } from 'framer-motion';

interface SceneAddProps {
  onCreateScene: (value?: any) => void;
}
export const SceneAdd = (props: SceneAddProps) => {
  const { onCreateScene = () => {} } = props;
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 0.98 }}
      style={{ cursor: 'pointer' }}
    >
      <Wrapper
        bordered={false}
        data-testid="add-scene-card"
        onClick={onCreateScene}
      >
        <AddDiv>
          <StyledI className=" mc-plus-2-line" />
        </AddDiv>
        <Text data-testid="add">Add new bonus art</Text>
        <AddInfo>( jpg, png, svg, or gif)</AddInfo>
      </Wrapper>
    </motion.div>
  );
};
