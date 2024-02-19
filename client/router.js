import home from "./pages/home.js";
import club from "./pages/club.js"
import login from "./pages/login.js";
import updateNavbar from "./components/navbar.js";
import register from "./pages/register.js";
import mypage from "./pages/mypage.js";
import showEvents from "./pages/event.js";
import editEventPage from "./pages/editEventPage.js";

async function route() {
  updateNavbar()
  const hash = location.hash.replace('#', '')
  const params = hash.split('?')
  switch (params[0]) {
    case "":
      $('main').html(await home())
      break;
    case "mypage":
      $('main').html(await mypage())
     break;
    case "events":
      $('main').html(await showEvents())
      break;
    case "editEventPage":
      $('main').html(await editEventPage(params[1], params[2]))
      break;
    case "club":
      $('main').html(await club.club(params[1]))
      club.editClick()
      break;
    case "register":
      $('main').html(await register())
      break;
    case "login":
      $('main').html(await login())
      break;
    // case "cart":
    //   $('main').html(cart())
    //   break;
    default:
      console.log("404 You've broken the internet")
  }

}

window.onhashchange = route
window.onload = route
