import axios from 'axios';
import { Collection } from '../core/_models';

const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const fetchPrivilege = async (): Promise<any> => {
  try {
    const apiBaseUrl: string = process.env.REACT_APP_AUTH_BASE_URL || ''
    const apiVersion: string = process.env.REACT_APP_API_VERSION || ''
    const url: string = `${apiBaseUrl}/${apiVersion}/${Collection}/fetch/format`
    const response = await axios.get(url, { ...config });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response);
    }
  }
}

export const useCustomApi = () => {
  return {
    fetchPrivilege,
  };
};