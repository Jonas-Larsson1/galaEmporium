export default async function home() {

  let html = ``

  let clubs = await (await fetch('/api/club')).json()

  for (const club of clubs) {
    let clubEvents = await getClubEvents(club._id)
    let nextEvent
    clubEvents[0] ? nextEvent = clubEvents[0] : nextEvent = {
      name: "No upcomming events",
      description: "",
      date: ""
    }

    html += `
    <article class="clubCard">
      <h1>${club.name}</h1>
      <p>${club.description}</p>
      <div class="nextClubEvent">
        <b>Next event:</b>
        <br>
        <a>${nextEvent.name}</a>
        <br>
        <u>${isValidDate(nextEvent.date) ? utcToDate(nextEvent.date) : ""}</u>
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

const isValidDate = (dateString) => {
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date)
}

const utcToDate = (utcDateString) => {
  const utcDate = new Date(utcDateString)

  const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      timeZone: 'Europe/Stockholm' // Specify the time zone for Sweden
  };
      
  // Format the date according to Swedish conventions
  const localDateString = utcDate.toLocaleString('sv-SE', options);

  return localDateString
}