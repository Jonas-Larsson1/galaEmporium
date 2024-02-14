import home from "./pages/home.js";
import club from "./pages/club.js";
import login from "./pages/login.js";
import event from "./pages/event.js";
import { createEvent } from "./pages/event.js";

async function route() {
  //console.log(location)

  switch (location.hash.replace('#', '')) {
    case "":
      $('main').html(await event())
      break;
    case "club":
      $('main').html(club())
      break;
    case "login":
      $('main').html(login())
      break;
    default:
      console.log("404 You've broken the internet")
  }

}

window.onhashchange = route
window.onload = route
