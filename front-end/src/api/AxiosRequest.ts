import axios from 'axios';
axios.defaults.withCredentials = true;

export const get = (url: any, params?: any) => {
  return axios({
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    url: url,
    params: params,
  });
};

export const post = (url: any, params?: any) => {
  return axios({
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    url: url,
    data: params,
  });
};
