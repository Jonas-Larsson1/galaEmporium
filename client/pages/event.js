import { utcToDate, isValidDate } from "../functions/utcToDate.js"
import { addToCart } from "../components/cart.js"

let events = []
export default async function showEvents(clubId){
    
    if (!clubId) {
        const response = await fetch ("/api/event")
        events = await response.json()
    } else {
        events = await (await fetch(`/api/clubEvents/${clubId}`)).json()
    }

    const currentUser = await (await fetch('/api/login')).json()
    // console.log(events)

    // console.log(result)
   
    let html = ""
    events.sort((a,b) => {
        return new Date(a.date) - new Date(b.date)
    })

    const isClubOwner = (userId, club) => {
        return club.owners.includes(userId)
    }

    for(let [index,event] of events.entries()){

        
        html+= `
        <div id="event-container">
            <h1>${event.name} </h1>
            <img src="${event.img}" id="event-img">
            <h2>${event.club_id.name}</h2>
            <h2>${event.description} </h2>
            <a href ="#editEventPage?${event._id}" class="material-symbols-outlined">
                ${isClubOwner(currentUser.loggedIn, event.club_id) ? "Edit event" : ""} 
            </a> 
            <u>
                <ul>    
                    <li>Cost: ${event.cost}</li> 
                    <li>Date: ${isValidDate(event.date) ? utcToDate(event.date) : ""}</li> 
                    <button onclick= "findEvent(${index});" id="test">Add to cart</button>
                </ul>
            </u>
        </div>`
    }
    // $('#test').on('click', addToCart)
    // $(document).on('click', '#test', addToCart);
    return `
    <article>${html}</article>`

}

 export async function createEvent(){
   
    const user = await fetch ("/api/user/65c9e1607fc34c46f1733e94") 
        const userResult = await user.json()
        const userClubs = userResult.club_id
    // console.log(userClubs)
    let club_data = ""
    for(let club of userClubs){
        // console.log(club)
        club_data+= `
        <option value=${club._id}>${club.name}</option> 
        `
    }
    return `
        <form onsubmit= "submitEvent(); return false"> 
        <h1> Create Event </h1> 
        <input type="text" name="name" placeholder="Event name">
        <input type="text" name="img" placeholder="Insert image URL">
        <label for="club">Choose club: </label>
        <select name="club">
            <option>${club_data}</option>
        </select>  
        <input type="text" name="description" placeholder="Event description">
        <input type="number" name="cost" placeholder="Ticket cost">
        <input type="number" name="max_attendees" placeholder="Max attendees for party!">
        <input type="datetime-local" name="date" placeholder="Date for event"> 
        <input type="submit" value="Publish your event!">
        </form>
    `
} 

  async function submitEvent(){
    
    // console.log("submitted")
   
    const data = {
        name: $(' [name="name"]').val(),
        img: $(' [name="img"]').val(),
        club_id: $(' [name="club"]').val(),
        description: $('[name="description"]').val(),
        cost: $(' [name="cost"]').val(),
        max_attendees: $(' [name="max_attendees"]').val(),
        date: $(' [name="date"]').val()
    }
    // console.log(data)
    const result = await fetch('api/event', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    // console.log('result', result)
   
}

function findEvent(index){

    addToCart(result[index])

}


window.findEvent = findEvent
window.submitEvent = submitEvent
