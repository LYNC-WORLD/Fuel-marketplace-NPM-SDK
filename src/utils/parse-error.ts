import { AxiosError } from 'axios';

export const parseError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) return error.response.data.message;
    if (error.request) return 'Something went wrong!';

    return error.message;
  }

  if (error instanceof Error) return error.message;
  if (typeof error === 'string' || typeof error === 'number' || typeof error === 'boolean') return String(error);
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    (typeof error.message === 'string' || typeof error.message === 'number' || typeof error.message === 'boolean')
  )
    return String(error.message);

  return 'Something went wrong!';
};
