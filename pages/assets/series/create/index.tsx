import { ReactNode } from 'react';
import { AuthLayoutContainer } from '@/containers';
import { CreateSeriesContainer } from '../../../../src/containers/assets/series/create-series';

const CreateSeriesPage = () => {
  return <CreateSeriesContainer />;
};
CreateSeriesPage.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayoutContainer>{page}</AuthLayoutContainer>;
};

export default CreateSeriesPage;
