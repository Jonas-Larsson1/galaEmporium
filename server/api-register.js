import club from "./api/club.js";
import login from "./api/login.js";
import event from "./api/events.js";
import user from "./api/users.js";
import event from "./api/events.js";

export default function (server) {
  club(server)
  login(server)
  user(server)
  event(server)
}
