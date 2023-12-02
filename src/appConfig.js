const APPLICATION_PATH = "/";


const ERROR_CODE = {
  Unauthorized: 401,
};

const ROLES = {
  ROLE_ADMIN: "ROLE_ADMIN",
  ROLE_SUPER_ADMIN: "ROLE_SUPER_ADMIN",
};

const COlOR = {
  PRIMARY_FIRST: "#4B49AC",
  PRIMARY_SECOND: "#98BDFF",
  SUPPORT_FIRST: "#7DA0FA",
  SUPPORT_SECOND: "#7978E9",
  SUPPORT_THIRD: "#F3797E",
};

module.exports = Object.freeze({
  ROOT_PATH: APPLICATION_PATH,
  URL_PREFIX: "/org",
  API_ENPOINT: "http://localhost:9090", //dev
  PRE_FIX: "/api",
  ROLES: ROLES,
  COLOR: COlOR,
  ERROR_CODE: ERROR_CODE,
});
