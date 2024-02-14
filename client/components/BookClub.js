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
export const bookClubTicket = new ClubTicket("Book Club Ticket", 100.00);
