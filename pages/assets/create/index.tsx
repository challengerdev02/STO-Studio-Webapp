import { ReactNode } from 'react';
import { CreateBookContainer } from 'src/containers/assets/create';
import { AuthLayoutContainer } from '@/containers';

const CreateBookPage = () => {
  return <CreateBookContainer />;
};
CreateBookPage.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayoutContainer>{page}</AuthLayoutContainer>;
};

export default CreateBookPage;
