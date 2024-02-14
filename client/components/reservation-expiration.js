import { emptyCart } from "./cart.js";

// reservation timeout 20 min (in millisec)
// short timeout for trial – CHANGE LATER!
export const reservationTimeout = 20 * 60 * 1000;

export function checkIfReservationExpired() {

  let timestampInSessionStorage = sessionStorage.getItem("timeWhenLastItemWasAdded");

  // if the value of lastItemWasAdded is not null (then cart is not empty)
  if (timestampInSessionStorage) {
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - parseInt(timestampInSessionStorage);
    if (timeElapsed >= reservationTimeout) {
      emptyCart();
      alert("Your reservation has expired");
    } else {
      setTimeout(checkIfReservationExpired, reservationTimeout - timeElapsed);
    }
  }
}
