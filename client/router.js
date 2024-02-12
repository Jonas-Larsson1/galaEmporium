import home from "./pages/home.js";
import club from "./pages/club.js";
import login from "./pages/login.js";
import cart from "./components/cart.js"
import updateNavbar from "./components/navbar.js"

// när html-fil är uppladdad
$( document ).ready(function() {
  updateNavbar()
})


$('aside').html(cart())


async function route() {
  //console.log(location)

  switch (location.hash.replace('#', '')) {
    case "":
      console.log("HOME", home())
      $('main').html(home())
      break;
    case "club":
      $('main').html(await club())
      break;
    case "login":
      $('main').html(await login())
      break;
    default:
      console.log("404 You've broken the internet")
  }

}

window.onhashchange = route
window.onload = route
