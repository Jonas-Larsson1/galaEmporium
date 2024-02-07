import club from "./api/club.js";
import login from "./api/login.js";

export default function (server) {
  club(server)
  login(server)
}