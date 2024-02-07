import about from "./api/about.js";
import contact from "./api/contact.js";

export default function (server) {
  about(server)
  contact(server)
}