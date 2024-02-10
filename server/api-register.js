import club from "./api/club.js";
import login from "./api/login.js";
import user from "./api/users.js";

export default function (server) {
  club(server)
  login(server)
  user(server)
}