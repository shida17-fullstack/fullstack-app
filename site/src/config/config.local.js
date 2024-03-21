const config = {};

config.domains = {};
config.domains.frontend = "http://localhost:3002";
config.domains.api = "http://localhost:3000";

config.routes = {
  register: "/public/users/register",
  login: "/public/users/login",
  userGet: "/protected/user"
};

config.method = "POST"; // Agrega el método POST aquí

export default config;
