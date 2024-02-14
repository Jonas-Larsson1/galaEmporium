import home from "./pages/home.js";
import club from "./pages/club.js";
import login from "./pages/login.js";
import cart from "./components/cart.js"
import updateNavbar from "./components/navbar.js"
import register from "./pages/register.js";
import event from "./pages/event.js";
import { createEvent } from "./pages/event.js";

// cart();


// när html-fil är uppladdad
// $( document ).ready(function() {
//   updateNavbar()
// })



async function route() {
  updateNavbar()
  const hash = location.hash.replace('#', '')
  const params = hash.split('?')
  switch (params[0]) {
    case "":
      $('main').html(await home())
      break;
    case "mypage":
      $('main').html(mypage())
    case "club":
      $('main').html(await club(params[1]))
      break;
    case "cart":
      $('main').html(cart())
      break;
    case "register":
      $('main').html(await register())
      break;
    case "login":
      $('main').html(await login())
      break;
    case "cart":
      $('main').html(cart())
      break;
    default:
      console.log("404 You've broken the internet")
  }

}

window.onhashchange = route
window.onload = route
