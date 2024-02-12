import club from "./api/club.js";
import login from "./api/login.js";
import event from "./api/events.js";

export default function (server) {
  club(server)
  login(server)
  event(server)
}