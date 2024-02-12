// access elements in html
const addToCartBtn = document.querySelector("#add-to-cart-btn");
const emptyCartBtn = document.querySelector("#empty-cart-btn");
const cartSummary = document.querySelector("#cart-summary");

// reservation timeout 20 min (in millisec)
const reservationTimeout = 20 * 60 * 1000;

// for logging when item was last added to cart
let lastItemWasAdded = null;

// if anything in session storage, get it
// if nothing, initialise empty array
let cartContents = JSON.parse(sessionStorage.getItem("cartContents")) || [];

function checkIfSessionExpired() {
  //if (cartContents.length > 0) {

  // if cart is not empty
  if (lastItemWasAdded) {
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - lastItemWasAdded;
    if (timeElapsed >= reservationTimeout) {
      emptyCart();
      alert("Your reservation has expired");
    }
  }
  //}
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

  // sets time for last addition to cart
  lastItemWasAdded = new Date().getTime();

  updateCart();
  checkEmptyCartBtnState();

  setTimeout(checkIfSessionExpired, reservationTimeout);
});

function emptyCart() {
  // empty array of cart content
  cartContents.forEach(item => {
    item.amount = 0;
  });
  cartContents = [];
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
      lastItemWasAdded = new Date().getTime();
      setTimeout(checkIfSessionExpired, reservationTimeout);
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
