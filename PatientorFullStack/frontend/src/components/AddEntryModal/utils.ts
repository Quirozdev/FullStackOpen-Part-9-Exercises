import axios from 'axios';

export const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error?.response?.data && typeof error?.response?.data === 'object') {
      if (
        error.response.data.error &&
        typeof error.response.data.error === 'string'
      ) {
        return error.response.data.error;
      }
    } else {
      return 'Unknown Axios error';
    }
  } else if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong, try again';
};
