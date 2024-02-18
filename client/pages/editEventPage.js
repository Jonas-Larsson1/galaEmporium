export default async function editEventPage(eventId){
    let event, method, currentClubName
    if (eventId) {
        event = await (await fetch(`/api/event/${eventId}`)).json()
        currentClubName = event.club_id.name
        method = 'put'     
    } else {
        event = {
            name: "Name your event",
            description: "Describe your event",
            cost: 0,
            date: Date.now(),
            max_attendees: 250,
            img: '../images/default.jpg'
        }
        method = 'post'
    }

    const eventDate = new Date(event.date)
    const formattedEventDate = eventDate.toISOString().slice(0, 16)

    const userId = await (await fetch ("/api/login")).json()
    if (userId.loggedIn) {

        const user = await (await fetch(`/api/user/${userId.loggedIn}`)).json()
        const userClubs = user.club_id

        let club_data = ""
        for(let club of userClubs){
            const selected = club.name === currentClubName ? "selected" : ""
            club_data+= `
            <option value=${club._id} ${selected}>${club.name}</option> 
            `
        }
            
        return `
        <form id="editEventForm">
        <label for="name">Change name</label><br>
        <input type="text" id="name" name="name" value="${event.name}"><br>
        
        <label for="description">Change description</label><br>
        <input type="text" id="description" name="description" value="${event.description}"><br>
        
        <label for="cost">Change cost</label><br>
        <input type="number" id="cost" name="cost" value="${event.cost}"><br>
        
        <label for="club">Choose club: </label><br>
        <select name="club">
            ${club_data}
        </select><br>
        
        <label for="date">Change date</label><br>
        <input type="datetime-local" id="date" name="date" value="${formattedEventDate}"><br>
        
        <label for="attendees">Max attendees</label><br>
        <input type="number" id="attendees" name="attendees" value="${event.max_attendees}"><br>
        
        <label for="img">Change image</label><br>
        <input type="text" id="img" name="img" value="${event.img}"><br>
        
        <input type="submit" value="Submit" onclick="updateEvent('${eventId}', ${method}); return false;">
        </form>
        `  
        } else {
            return `
                <p>You need to be logged in to create/edit events</p>
            `
        } 
    } 
        
async function updateEvent(eventId, method){

    const updatedData = {
        name: $('[name="name"]').val(),
        description: $('[name="description"]').val(),
        cost: $('[name="cost"]').val(),
        date: $('[name="date"]').val(),
        max_attendees: $('name="max_attendees"').val(),
        club_id: $('name="club"').val(),
        img: $('[name="img"]').val(),
    }

    let event
    if (method === 'put') {
        event = await fetch(`/api/event/${eventId}`, {
            method: "put" ,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
    } else {
        event = await fetch(`/api/event`, {
            method: "post" ,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
    }
    // const res = await event.json()
    // console.log(res)
} 
    
window.updateEvent = updateEvent