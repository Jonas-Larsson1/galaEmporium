// import { cartSummary, submitBookingBtn } from "./html-elements.js"; 
import { reservationTimeout, checkIfReservationExpired } from "./reservation-expiration.js";

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
  // console.log(event)

  // här behövs: id från event i stället för dummy title
  // let alreadyInCart = findItemByTitle(bookClubTicket.title, cartContents);
  // let dataContainer = document.createElement("div")

  
  // let alreadyInCart = 0;

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

    let alreadyInCart = false 
    const existingCartItems = JSON.parse(sessionStorage.getItem("cartContents")) || []
    // console.log(existingCartItems)


    if (existingCartItems.length > 0) {
      existingCartItems.forEach(item => {
        if (item.event_id === event._id) {
          item.amount++
          item.totalPrice += item.price
          alreadyInCart = true
        }
      })
    }

    if (!alreadyInCart) {
      existingCartItems.push({
        title: event.name,
        event_id: event._id,
        amount: 1,
        date: event.date,
        price: event.cost,
        totalPrice: event.cost 
      });
    }

    // console.log(alreadyInCart)
    sessionStorage.setItem("cartContents", JSON.stringify(existingCartItems));
      

    // cartContents.push({
    //   title: event.name,
    //   event_id: event._id,
    //   amount: 1,
    //   date: event.date,
    //   price: event.cost
    // });

    // sessionStorage.setItem("cartContents", JSON.stringify(cartContents));
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
  // if (!countdownInterval) {
  //   countdownInterval = setInterval(updateCountdown, 1000);
  // }
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
  // updateCart(cartContents);
  // toggleCartButtons();
  // stop countdown timer
  clearInterval(countdownInterval);
  // countdownDiv.textContent = "";

  timeWhenLastItemWasAdded = null;
}
