import home from "./pages/home.js";
import club from "./pages/club.js";
import login from "./pages/login.js";
import cart from "./components/cart.js"
import updateNavbar from "./components/navbar.js"

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
    case "mypage": // ändra funktion
      $('main').html(await club())
      break;
    case "login":
      $('main').html(await login())
      break;
    case "cart":
      $('main').html(await cart())
      break;
    default:
      console.log("404 You've broken the internet")
  }

}

window.onhashchange = route
window.onload = route
