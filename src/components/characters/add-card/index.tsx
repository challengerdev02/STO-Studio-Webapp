import { StyledI, AddInfo, AddDiv, Text, Span, Wrapper } from './index.styled';
import { motion } from 'framer-motion';

interface CharacterAddProps {
  onCreateCharacter: (value?: any) => void;
}
export const CharacterAdd = (props: CharacterAddProps) => {
  const { onCreateCharacter = () => {} } = props;
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 0.98 }}
      style={{ cursor: 'pointer' }}
    >
      <Wrapper bordered={false} onClick={onCreateCharacter}>
        <AddDiv>
          <StyledI className=" mc-plus-2-line" />
        </AddDiv>
        <Text data-testid="add">Add new character</Text>
        <AddInfo>
          (<Span>Character:</Span> jpg, png, svg, or gif)
        </AddInfo>
      </Wrapper>
    </motion.div>
  );
};
