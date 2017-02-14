import fetch from 'node-fetch';

const sendRequest = (url, method, body, headers) =>
  fetch(url, {
    method,
    headers: headers ? headers : { },
    body: body
  }).then(response => {
    if (response.ok)
      return response;

    throw response;
  });

const get = (url, headers) => sendRequest(url, 'GET', null, headers);

const post = (url, body, headers) => sendRequest(url, 'POST', body, headers);

const put = (url, body, headers) => sendRequest(url, 'PUT', body, headers);

const del = (url, body, headers) => sendRequest(url, 'DELETE', null, headers);

export default {
  sendRequest,
  get,
  post,
  put,
  del
};
