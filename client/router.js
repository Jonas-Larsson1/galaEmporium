import home from "./pages/home.js";
import club from "./pages/club.js";
import login from "./pages/login.js";

async function route() {
  const hash = location.hash.replace('#', '')
  const param = hash.split('?')[1]
  switch (hash.split('?')[0]) {
    case "":
      $('main').html(await home())
      break;
    case "club":
      $('main').html(await club(param))
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
