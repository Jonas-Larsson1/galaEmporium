import club from "./api/club.js";
import login from "./api/login.js";
import event from "./api/events.js";
import user from "./api/users.js";
import booking from "./api/bookings.js";

export default function (server) {
  club(server)
  login(server)
  event(server)
  user(server)
  booking(server)
}
