import { emptyCartBtn, cartSummary, submitBookingBtn } from "./html-elements.js";

export default function toggleCartButtons() {

  let cartContents = JSON.parse(sessionStorage.getItem("cartContents"));

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
