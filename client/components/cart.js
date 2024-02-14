import { addToCartBtn, emptyCartBtn, cartSummary, submitBookingBtn } from "./html-elements.js";
import { bookClubTicket } from "./BookClub.js";
import { reservationTimeout, checkIfReservationExpired } from "./reservation-expiration.js";
import { findItemByTitle } from "./process-data-utils.js";
import { updateCart } from "./update-cart.js";

// if anything in session storage, get it
// if nothing, initialise empty array
let cartContents = JSON.parse(sessionStorage.getItem("cartContents")) || [];

// for logging when item was last added to cart
let timeWhenLastItemWasAdded = parseInt(sessionStorage.getItem("timeWhenLastItemWasAdded"));

// if page reloads during session, reservation expiration time still counts down
window.addEventListener("load", checkIfReservationExpired);

export function toggleCartButtons() {
  // if nothing in cart: empty cart button disabled
  if (cartContents.length === 0) {
    emptyCartBtn.disabled = true;
    submitBookingBtn.disabled = true;
    cartSummary.textContent = "Your cart is currently empty";
  } else {
    emptyCartBtn.disabled = false;
    submitBookingBtn.disabled = false;
  }
}

addToCartBtn.addEventListener("click", () => {
  let alreadyInCart = findItemByTitle(bookClubTicket.title);

  // if ticket/s for chosen club already in cart: update object amount only
  if (alreadyInCart) {
    alreadyInCart.amount++;
  }
  // if ticket/s for chosen club not in cart: add object to array
  else {
    cartContents.push({
      title: bookClubTicket.title,
      amount: 1
    });
  }

  // sets time for addition to cart
  timeWhenLastItemWasAdded = new Date().getTime();
  sessionStorage.setItem("timeWhenLastItemWasAdded", JSON.stringify(timeWhenLastItemWasAdded));
  console.log("value of timeWhenLastItemWasAdded after being added with 'add to cart' btn ", timeWhenLastItemWasAdded);
  updateCart(cartContents);
  toggleCartButtons();

  // set timeout from addition to cart
  setTimeout(checkIfReservationExpired, reservationTimeout);
});

export function emptyCart() {
  // empty array of cart content
  cartContents.forEach(item => {
    item.amount = 0;
  });
  cartContents = [];
  sessionStorage.removeItem("timeWhenLastItemWasAdded");
  // update session storage
  sessionStorage.setItem("cartContents", JSON.stringify(cartContents));
  updateCart(cartContents);
  toggleCartButtons();
}

// check initial state of btn
toggleCartButtons();

emptyCartBtn.addEventListener("click", () => {
  emptyCart();
});

updateCart(cartContents);
toggleCartButtons();

submitBookingBtn.addEventListener("click", () => {
  console.log("Klick!");
  emptyCart();
})
