export default async function home() {

  let html = ``

  let clubs = await (await fetch('/api/club')).json()

  for (const club of clubs) {
    let clubEvents = await getClubEvents(club._id)
    let nextEvent
    clubEvents[0] ? nextEvent = clubEvents[0] : nextEvent = {
      name: "No upcomming events",
      description: ""
    }

    html += `
    <article class="clubCard">
      <h1>${club.name}</h1>
      <p>${club.description}</p>
      <div class="nextClubEvent">
      <b>Next event:</b>
      <br>
        <a>${nextEvent.name}</a>
        <p>${nextEvent.description}</p>
      <div>
    </article>
    `
  };

  return `<div id="home">${html}</div>`
} 

const getClubEvents = async (clubId) => {
  let clubEvents = await (await fetch(`/api/event/${clubId}`)).json()
  return clubEvents
}