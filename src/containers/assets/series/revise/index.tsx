import { CreateSeriesContainer } from '../create-series';

export const ReviseSeriesContainer = () => {
  return (
    <CreateSeriesContainer
      visibility={false}
      onVisibilityChange={(d) => d}
      onCreateComplete={() => null}
      domain={'revise'}
    />
  );
};
