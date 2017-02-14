import OAuthApi from './OAuthApi';
import config from '../config';

const url = config.api.conrad;

const getRoles = userId =>
  OAuthApi.get(`${url}/user/${userId}/roles`).then(response => response.json());

const addRole = (userId, role) =>
  OAuthApi.put(`${url}/user/${userId}/role/${role}`);

const deleteRole = (userId, role) =>
  OAuthApi.del(`${url}/user/${userId}/role/${role}`);


export default {
  getRoles,
  addRole,
  deleteRole
};
