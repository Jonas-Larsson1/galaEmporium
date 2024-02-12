import home from "./pages/home.js";
import club from "./pages/club.js";
import login from "./pages/login.js";
import cart from "./components/cart.js"
import updateNavbar from "./components/navbar.js"
import register from "./pages/register.js";

// cart();


// när html-fil är uppladdad
$( document ).ready(function() {
  updateNavbar()
})

async function route() {
  //console.log(location)

  switch (location.hash.replace('#', '')) {
    case "":
      console.log("HOME", home())
      $('main').html(home())
      break;
    case "mypage":
      $('main').html(club())
      break;
    case "cart":
      $('main').html(login())
      break;
    case "register":
      $('main').html(await register())
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
