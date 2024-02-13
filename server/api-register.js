import club from "./api/club.js";
import event from "./api/events.js";
import user from "./api/users.js";
import booking from "./api/bookings.js";

export default function (server) {
  club(server)
  event(server)
  user(server)
  booking(server)
}
