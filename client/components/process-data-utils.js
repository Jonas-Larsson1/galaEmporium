// for checking if there are already ticket/s for a given club in the cart
export function findItemByTitle(title, cartContents) {
  return cartContents.find(item => item.title === title)
}

// for adding initial zero to seconds 9–0
export function countdownSecondsToTwoDigits(seconds) {
  return (seconds < 10 ? "0" : "") + seconds;
}

// for adding initial zero to minutes 9–0
export function countdownMinutesToTwoDigits(minutes) {
  return (minutes < 10 ? "0" : "") + minutes;
}
