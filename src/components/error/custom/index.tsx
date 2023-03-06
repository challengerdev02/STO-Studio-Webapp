import { Button } from 'antd';
import { ResultStatusType } from 'antd/lib/result';
import { StyledResult } from './index.styled';

interface CustomErrorProps {
  message: string;
  buttonMessage: string;
  status: ResultStatusType;
  title: string;
  handleButtonClick: () => void;
}
export const CustomError = (props: CustomErrorProps) => {
  const { message, status, title, buttonMessage, handleButtonClick } = props;
  return (
    <StyledResult
      status={status}
      title={title}
      subTitle={message}
      extra={
        <Button onClick={handleButtonClick} shape={'round'} type="primary">
          {buttonMessage}
        </Button>
      }
    />
  );
};
