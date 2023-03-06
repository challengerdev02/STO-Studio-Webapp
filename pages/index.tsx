import type { NextPage } from 'next';
// import { ReactNode } from 'react';
import 'metacomicicons/fonts/metacomic.css';
import { ReadSeriesContainer } from '../src/containers/read';

const ReadPage: NextPage = () => {
  return <ReadSeriesContainer />;
};
//@ts-ignore
// MarketPlacePage.getLayout = function getLayout(page: ReactNode) {
//   return <AuthLayoutContainer>{page}</AuthLayoutContainer>;
// };
export default ReadPage;
