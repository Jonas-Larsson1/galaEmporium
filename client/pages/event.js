export default async function event(){ 
    const response = await fetch ("/api/event")
    const result = await response.json()

    console.log(result)

    let html = ""
    result.sort((a,b) => {
        return new Date(a.date) - new Date(b.date)
    })

    for(let data of result){
        console.log(data)
    html+= `
    <div id="event-container">
    <h1>${data.name} </h1>
    <img src="${data.img}" id="event-img">
    <h2>${data.club_id.name}</h2>
    <h2>${data.description} </h2> 
    <u><ul>    
        <li>Cost: ${data.cost}</li> 
        <li>Date: ${data.date}</li> 
   </ul> </u>
   </div>`
    }
    return `<article>${html}</article>`
}

 export async function createEvent(){
   
    const user = await fetch ("/api/user/65c9e1607fc34c46f1733e94") 
        const userResult = await user.json()
        const userClubs = userResult.club_id
    console.log(userClubs)
    let club_data = ""
    for(let club of userClubs){
        console.log(club)
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
    
    console.log("submitted")
   
    const data = {
        name: $(' [name="name"]').val(),
        img: $(' [name="img"]').val(),
        club_id: $(' [name="club"]').val(),
        description: $('[name="description"]').val(),
        cost: $(' [name="cost"]').val(),
        max_attendees: $(' [name="max_attendees"]').val(),
        date: $(' [name="date"]').val()
    }
    console.log(data)
    const result = await fetch('api/event', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log('result', result)
   
}

window.submitEvent = submitEvent