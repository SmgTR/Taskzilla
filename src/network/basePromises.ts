import axios from 'axios';

export interface Response {
  data: string;
}

const getErrorMessage = (error: any): string => {
  if (error?.response?.data?.error) {
    return error?.message + '\n' + error.response.data.error;
  }

  return error?.message;
};

export function responseValue<TResponse>(response: Response): TResponse {
  if (typeof response.data === 'object') {
    return response.data;
  }
  return JSON.parse(response.data) as TResponse;
}

export async function getPromise<TPayload, TResponse>(
  url: string,
  payload?: TPayload
): Promise<TResponse> {
  return axios
    .get(url, {
      params: { ...payload, timeStamp: Date.now() }
    })
    .then((response) => responseValue<TResponse>(response))
    .catch((error) => {
      throw new Error(getErrorMessage(error));
    });
}
export async function postPromise<TPayload, TResponse>(
  url: string,
  payload?: TPayload
): Promise<TResponse> {
  return axios
    .post(url, payload)
    .then((response) => responseValue<TResponse>(response))
    .catch((error) => {
      throw new Error(getErrorMessage(error));
    });
}
