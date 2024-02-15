// import { cartSummary } from "./html-elements.js";
import { emptyCart } from "./cart.js";
import { checkIfReservationExpired, reservationTimeout } from "./reservation-expiration.js";
// import { toggleCartButtons } from "./cart.js";

export function updateCart(cartContents) {
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
      const currentTime = new Date().getTime();
      sessionStorage.setItem("timeWhenLastItemWasAdded", currentTime);
      // update timeout from last addition to cart
      setTimeout(checkIfReservationExpired, reservationTimeout);
      updateCart(cartContents);
      toggleCartButtons();
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
        if (cartContents.length === 0) {
          emptyCart();
        }
        updateCart(cartContents);
        // if amount of item becoming zero also empties the cart, empty cart button will disable here
        toggleCartButtons();
      }
    });
    newRow.append(newAddBtn);
    newRow.append(newSubtractBtn);
    cartSummary.append(newRow);
  });

  // update session storage
  sessionStorage.setItem("cartContents", JSON.stringify(cartContents));
}
