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
        <form> 
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
        </form>
    `
} 
