// for checking if there are already ticket/s for a given club in the cart
export function findItemByTitle(title, cartContents) {
  return cartContents.find(item => item.title === title)
}
