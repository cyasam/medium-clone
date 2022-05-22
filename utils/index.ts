import axios from 'axios';

export const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL,
  timeout: 2000,
});

export const serializeData = (data: unknown) => {
  const string = JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
  return JSON.parse(string);
};
