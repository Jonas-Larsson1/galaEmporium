export default async function editEventPage(eventId){
    // const response = await fetch(`/api/event/${eventId}`)
    // const event = await response.json()
    const event = await (await fetch(`/api/event/${eventId}`)).json()
    console.log(event)

        return`
        <div> hej </div>
        `

}