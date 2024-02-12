import club from "./api/club.js";
import user from "./api/users.js";

export default function (server) {
  club(server)
  user(server)
}
