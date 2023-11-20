import { AxiosError } from 'axios';

const handleError = (error: any, action: (value: React.SetStateAction<string>) => void) => {
  if (error instanceof Error || error instanceof AxiosError) {
    action(error.message);
  }
};

export default handleError;
