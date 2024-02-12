import club from "./api/club.js";
import user from "./api/users.js";
import booking from "./api/bookings.js";

export default function (server) {
  club(server)
  user(server)
  booking(server)
}
