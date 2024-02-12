export default async function event(){ 
    const response = await fetch ("/api/event")
    const result = await response.json()

    console.log(result)

    let html = ""

    for(let data of result){
    html+= `
    <h1>${data.name} </h1>
    <h2>${data.description} </h2>
    <h2>${data.club_id}</h2> 
    <ol>    
        <li>Cost: ${data.cost}</li> 
        <li>Date: ${data.date}</li> 
   </ol>`
    }
    return `<article>${html}</article>`
}

/* export default function createEvent(){
    return `
        <form> 
        <h1> Create Event </h1> 
        <input type="text" name="name" placeholder="Event name">
        <input type="tetxt" name="description" placeholder="Event description">
        </form>
    `
} */