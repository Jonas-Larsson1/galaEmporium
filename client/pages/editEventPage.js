export default async function editEventPage(eventId){
    const event = await (await fetch(`/api/event/${eventId}`)).json()

    return `
    <form id="editEventForm">
        <label for="name">Change name</label><br>
        <input type="text" id="name" name="name" value="${event.name}"><br>
        
        <label for="description">Change description</label><br>
        <input type="text" id="description" name="description" value="${event.description}"><br>
        
        <label for="cost">Change cost</label><br>
        <input type="number" id="cost" name="cost" value="${event.cost}"><br>

        <label for="date">Change date</label><br>
        <input type="datetime-local" id="date" name="date" value="${event.date}"><br>

        <label for="img">Change image</label><br>
        <input type="text" id="img" name="img" value="${event.img}"><br>
        
        <input type="submit" value="Submit" onclick="updateEvent('${eventId}'); return false;">
    </form>
    `  
}

 async function updateEvent(eventId){

    const updatedData = {
        name: $('[name="name"]').val(),
        description: $('[name="description"]').val(),
        cost: $('[name="cost"]').val(),
        date: $('[name="date"]').val(),
        img: $('[name="img"]').val(),
    }

    const thisEvent = await fetch(`/api/event/${eventId}`, {
        method: "put" ,
          headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    const res = await thisEvent.json()
    console.log(res)
} 
    


window.updateEvent = updateEvent