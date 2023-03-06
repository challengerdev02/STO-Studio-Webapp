import { useRouter } from 'next/router';
import { CustomError } from '@/components';

export const Error404Container = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (router.query?.referrer) {
      router.push(router.query.referrer as string);
    } else {
      router.push('/account');
    }
  };

  return (
    <>
      <CustomError
        status="403"
        title="404"
        message="Sorry, the page you visited does not exist."
        buttonMessage="Back Home"
        handleButtonClick={handleButtonClick}
      />
    </>
  );
};
