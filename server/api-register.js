import club from "./api/club.js"
import user from "./api/users.js";
import event from "./api/events.js";


export default function (server) {
  club(server)
  user(server)
  event(server)
}
