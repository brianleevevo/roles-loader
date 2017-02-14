import ClientOAuth2 from 'client-oauth2';
import log from 'winston';
import FetchApi from './FetchApi';
import config from '../config';

let token = '';
let refreshToken = '';
const MAX_RETRIES = 3;

const auth = () => {
  const vevoAuth = new ClientOAuth2({
    clientId: config.auth.clientId,
    clientSecret: config.auth.clientSecret,
    accessTokenUri: config.auth.accessTokenUri,
    authorizationUri: config.auth.authorizationUri,
    redirectUri: 'http://example.com/auth/vevo/callback',
    scopes: [ 'administrator', 'account-administration' ]
  });

  return vevoAuth.owner.getToken(config.auth.username, config.auth.password)
    .then(user => {
      setToken(user.data.access_token);
      return token;
    });
};

const getToken = () =>
  token ? Promise.resolve(token) : auth();

const setToken = value => token = value;
const setRefreshToken = value => refreshToken = value;

const setAuthHeader = headers => {
  const requestHeaders = headers ? headers : { };
  requestHeaders['authorization'] = `Bearer ${token}`;

  return requestHeaders;
};

const sendRefreshToken = () =>
  FetchApi.post(config.auth.accessTokenUri, `grant_type=refresh_token&refresh_token=${refreshToken}`, { 'Content-Type': 'application/x-www-form-urlencoded' })
    .then(user => {
      setToken(user.data.access_token);
      setRefreshToken(user.data.refresh_token);

      return user.data.access_token;
    });

const sendAuthRequest = (url, method, body = null, headers, retryCount = 0) =>
  getToken().then(() =>
    FetchApi.sendRequest(url, method, body, setAuthHeader(headers))
      .catch(response => {
        if (response.status === 401 || response.status === 403) {
          if (retryCount >= MAX_RETRIES)
            throw response;

          return sendRefreshToken().then(() =>
            sendAuthRequest(url, method, body, headers, retryCount + 1)
          );
        }

        return response;
      })
  );

const get = (url, headers) => sendAuthRequest(url, 'GET', null, headers);

const post = (url, body, headers) => sendAuthRequest(url, 'POST', body, headers);

const put = (url, body, headers) => sendAuthRequest(url, 'PUT', body, headers);

const del = (url, body, headers) => sendAuthRequest(url, 'DELETE', null, headers);

export default {
  get,
  post,
  put,
  del
};
