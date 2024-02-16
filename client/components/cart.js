// import { cartSummary, submitBookingBtn } from "./html-elements.js"; 
import { reservationTimeout, checkIfReservationExpired } from "./reservation-expiration.js";
import { findItemByTitle, countdownSecondsToTwoDigits, countdownMinutesToTwoDigits } from "./process-data-utils.js";
import { updateCart } from "./update-cart.js";


// const countdownDiv = document.querySelector("#countdown");

// if anything in session storage, get it
// if nothing, initialise as empty array
let cartContents = JSON.parse(sessionStorage.getItem("cartContents")) || [];

// for logging when item was last added to cart
let timeWhenLastItemWasAdded = parseInt(sessionStorage.getItem("timeWhenLastItemWasAdded"));

let countdownInterval;

// if page reloads during session, reservation expiration time still counts down
// window.addEventListener("load", () => {
//   checkIfReservationExpired();
//   toggleCartButtons();

//   if (timeWhenLastItemWasAdded) {
//     let currentTime = new Date().getTime();
//     let timeElapsed = currentTime - timeWhenLastItemWasAdded;
//     let timeRemaining = Math.max(reservationTimeout - timeElapsed, 0);

//     if (timeRemaining > 0) {
//       countdownInterval = setInterval(updateCountdown, 1000);
//     } else {
//       countdownDiv.textContent = "";
//     }
//   }
// });

// export function toggleCartButtons() {
//   // if nothing in cart: empty cart button disabled
//   if (cartContents.length === 0) {
//     emptyCartBtn.disabled = true;
//     submitBookingBtn.disabled = true;
//     cartSummary.textContent = "Your cart is currently empty";
//   } else {
//     emptyCartBtn.disabled = false;
//     submitBookingBtn.disabled = false;
//   }
// }




export function addToCart(event) {
  console.log(event)

  // här behövs: id från event i stället för dummy title
  // let alreadyInCart = findItemByTitle(bookClubTicket.title, cartContents);
  // let dataContainer = document.createElement("div")

  
  let alreadyInCart = 0;

  // // if ticket/s for chosen club already in cart: update object amount only
  // if (alreadyInCart) {
  //   alreadyInCart.amount++;
  // }
  // // if ticket/s for chosen club not in cart: add object to array
  // else {
    // här behövs: user id, club id, tickets left
    // cartContents.push({
    //   title: bookClubTicket.title,
    //   amount: 1
    // });
    cartContents.push({
      title: event.name,
      event_id: event._id,
      amount: 1
    });

    sessionStorage.setItem("cartContents", JSON.stringify(cartContents));
  }

  clearInterval(countdownInterval);

  // sets time for addition to cart
  timeWhenLastItemWasAdded = new Date().getTime();
  sessionStorage.setItem("timeWhenLastItemWasAdded", timeWhenLastItemWasAdded);
  // updateCart(cartContents);
  // toggleCartButtons();

  // set timeout from addition to cart
  setTimeout(checkIfReservationExpired, reservationTimeout);

  // start the countdown timer if it is not already running
  if (!countdownInterval) {
    countdownInterval = setInterval(updateCountdown, 1000);
  }
//};


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
  // stop countdown timer
  clearInterval(countdownInterval);
  // countdownDiv.textContent = "";

  timeWhenLastItemWasAdded = null;
}

function updateCountdown() {
  if (timeWhenLastItemWasAdded) {
    let currentTime = new Date().getTime();
    let timeElapsed = currentTime - timeWhenLastItemWasAdded;
    let timeRemaining = Math.max(reservationTimeout - timeElapsed, 0);

    let minutes = Math.floor(timeRemaining / (1000 * 60));
    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    seconds = countdownSecondsToTwoDigits(seconds);
    minutes = countdownMinutesToTwoDigits(minutes);
    // countdownDiv.textContent = `Your tickets are reserved for another ${minutes}:${seconds}`;

    if (timeRemaining === 0) {
      clearInterval(countdownInterval);
      checkIfReservationExpired();
    }
  }
}

// check initial state of btn
// toggleCartButtons();

// emptyCartBtn.addEventListener("click", () => {
//   emptyCart();
// });

// updateCart(cartContents);
// //toggleCartButtons();

// if (cartContents.length > 0) {
//   countdownInterval = setInterval(updateCountdown, 1000);
// }

// // här behövs:
// // POST till bookings 
// // PUT till events (minska antalet tillgängliga platser på event)
// submitBookingBtn.addEventListener("click", () => {
//   //submitBooking();
//   console.log("Klick!");
//   emptyCart();
// });
