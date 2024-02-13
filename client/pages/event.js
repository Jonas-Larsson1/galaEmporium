export default async function event(){ 
    const response = await fetch ("/api/event")
    const result = await response.json()

    console.log(result)

    let html = ""

    for(let data of result){
        console.log(data)
    html+= `
    <h1>${data.name} </h1>
    <img src="${data.img}">
    <h2>${data.club_id.name}</h2>
    <h2>${data.description} </h2> 
    <ol>    
        <li>Cost: ${data.cost}</li> 
        <li>Date: ${data.date}</li> 
   </ol>`
    }
    return `<article>${html}</article>`
}

 export function createEvent(){
    return `
        <form onsubmit= "submitEvent(); return false"> 
        <h1> Create Event </h1> 
        <input type="text" name="name" placeholder="Event name">
        <input type="text" name="image" placeholder="Insert image URL">
        <label for="club">Choose club: </label>
        <select name="club">
            <option></option>
            <option value="SpaceX">SpaceX</option>
        </select>  
        <input type="text" name="description" placeholder="Event description">
        <input type="number" name="cost" placeholder="Ticket cost">
        <input type="date" name="date" placeholder="Date for event"> 
        <input type="submit" value="Publish your event!">
        </form>
    `
} 

  async function submitEvent(){
    
    console.log("submitted")
   
    const data = {
        name: $(' [name="name"]').val(),
        image: $(' [name="image"]').val(),
        club: $(' [name="club"]').val(),
        description: $('[name="description"]').val(),
        cost: $(' [name="cost"]').val(),
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