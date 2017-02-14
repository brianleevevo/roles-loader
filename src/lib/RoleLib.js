import Promise from 'bluebird';
import log from 'winston';
import RoleApi from '../api/RoleApi';
import ROLES from '../roles/Roles';


export const getRoles = userId =>
  RoleApi.getRoles(userId).then(roles => {
    log.info(roles);
    return roles;
  });

export const addRole = (userId, role) =>
  RoleApi.addRole(userId, role);

export const addAndRemoveRole = (userId, role) => {
  return RoleApi.addRole(userId, role)
    .then(() => getRoles(userId))
    .then(() => RoleApi.deleteRole(userId, role))
    .then(() => getRoles(userId));
};


export const addAllRoles = userId => {
  log.info(userId);
  let roles = [ ];

  for (let prop in ROLES) {
    const role = ROLES[prop];
    roles = [ ...roles, role ];
  }

  return Promise.map(roles, role => log.info(role), { concurrency: 5 });
};
