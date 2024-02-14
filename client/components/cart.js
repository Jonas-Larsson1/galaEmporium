import { addToCartBtn, emptyCartBtn, cartSummary, submitBookingBtn } from "./html-elements.js";
import { bookClubTicket } from "./BookClub.js";
import { reservationTimeout, checkIfReservationExpired } from "./reservation-expiration.js";
import { findItemByTitle } from "./process-data-utils.js";
import { updateCart } from "./update-cart.js";

// reservation timeout 20 min (in millisec)
const reservationTimeout = 20 * 60 * 1000;

// for logging when item was last added to cart
//let timeWhenLastItemWasAdded = null;
//console.log("initial value of lastItemWasAdded ", timeWhenLastItemWasAdded);

// if anything in session storage, get it
// if nothing, initialise empty array
let cartContents = JSON.parse(sessionStorage.getItem("cartContents")) || [];
let timeWhenLastItemWasAdded;
let sessionStorageTimestamp = sessionStorage.getItem("timeWhenLastItemWasAdded");

// if timestamp in sessionStorage is not null, get it
// if no timestamp in sessionStorage, initialise null timestamp
sessionStorageTimestamp ? timeWhenLastItemWasAdded = JSON.parse(sessionStorageTimestamp) : timeWhenLastItemWasAdded = null;
//let timeWhenLastItemWasAdded = JSON.parse(sessionStorage.getItem("timeWhenLastItemWasAdded"));
console.log(1, timeWhenLastItemWasAdded);

window.addEventListener("load", checkIfReservationExpired);

function checkIfReservationExpired() {
  // if the value of lastItemWasAdded is not null (then cart is not empty)
  console.log("value of timeWhenLastItemWasAdded in checkIfReservationExpired function", timeWhenLastItemWasAdded);
  if (timeWhenLastItemWasAdded) {
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - timeWhenLastItemWasAdded;
    if (timeElapsed >= reservationTimeout) {
      emptyCart();
      alert("Your reservation has expired");
    }
  }
}

// for checking if there are already ticket/s for a given club in the cart
function findItemByTitle(title) {
  return cartContents.find(item => item.title === title)
}

// DUMMY
class ClubTicket {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.amount = 0;
  }
}

// will need values from events database
// this is a drill
let bookClubTicket = new ClubTicket("Book Club Ticket", 100.00);

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
  updateCart();
  checkEmptyCartBtnState();

  // set timeout from addition to cart
  setTimeout(checkIfReservationExpired, reservationTimeout);
});

function emptyCart() {
  // empty array of cart content
  cartContents.forEach(item => {
    item.amount = 0;
  });
  cartContents = [];
  timeWhenLastItemWasAdded = null;
  sessionStorage.setItem("timeWhenLastItemWasAdded", JSON.stringify(timeWhenLastItemWasAdded));
  console.log("value of timeWhenLastItemWasAdded inside emptyCart function ", timeWhenLastItemWasAdded);
  // update session storage
  sessionStorage.setItem("cartContents", JSON.stringify(cartContents));
  updateCart();
  checkEmptyCartBtnState();
}

function checkEmptyCartBtnState() {
  // if nothing in cart: empty cart button disabled
  if (cartContents.length === 0) {
    emptyCartBtn.disabled = true;
    cartSummary.textContent = "Your cart is currently empty";
  } else {
    emptyCartBtn.disabled = false;
  }
}

// check initial state of btn
checkEmptyCartBtnState();

emptyCartBtn.addEventListener("click", () => {
  emptyCart();
});

function updateCart() {
  // empty element if anything is added to cart
  cartSummary.textContent = "";

  // list added items
  cartContents.forEach(item => {
    const newRow = document.createElement("div");
    newRow.textContent = `${item.title} ${item.amount}`;

    // button to add more tickets to chosen event
    const newAddBtn = document.createElement("button");
    newAddBtn.textContent = "+";
    newAddBtn.addEventListener("click", () => {
      item.amount++;
      // update time for last addition to cart
      timeWhenLastItemWasAdded = new Date().getTime();
      sessionStorage.setItem("timeWhenLastItemWasAdded", JSON.stringify(timeWhenLastItemWasAdded));
      console.log("value of timeWhenLastItemWasAdded after clicking add button in cart ", timeWhenLastItemWasAdded)
      // update timeout from last addition to cart
      setTimeout(checkIfReservationExpired, reservationTimeout);
      updateCart();
      checkEmptyCartBtnState();
    });

    // button to subtract tickets from cart
    const newSubtractBtn = document.createElement("button");
    newSubtractBtn.textContent = "–";

    newSubtractBtn.addEventListener("click", () => {
      // if there are more than zero tickets: subtract
      if (item.amount > 0) {
        item.amount--;
        // if by clicking button amount becomes zero: remove item
        if (item.amount === 0) {
          const index = cartContents.indexOf(item);
          if (index !== -1) {
            cartContents.splice(index, 1);
          }
        }
        updateCart();
        // if amount of item becoming zero also empties the cart, empty cart button will disable here
        checkEmptyCartBtnState();
      }
    });
    newRow.append(newAddBtn);
    newRow.append(newSubtractBtn);
    cartSummary.append(newRow);
  });

  // update session storage
  sessionStorage.setItem("cartContents", JSON.stringify(cartContents));
}

updateCart();
checkEmptyCartBtnState();
