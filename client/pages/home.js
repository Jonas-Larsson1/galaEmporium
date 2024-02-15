import { utcToDate, isValidDate } from "../functions/utcToDate.js"

export default async function home() {

  let htmlEvent = `` 

  htmlEvent += `
  <a href="#events"><h1 class="clubCard"> All upcoming events... </h1></a>

  
  `

  let html = ``
  
  let clubs = await (await fetch('/api/club')).json()

  for (const club of clubs) {
    let clubEvents = await getClubEvents(club._id)
    clubEvents.sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    })


    let nextEvent
    clubEvents[0] ? nextEvent = clubEvents[0] : nextEvent = {
      name: "No upcomming events",
      description: "",
      date: "",
      img: "../images/default.jpg"
    }

    html += `
    <article class="clubCard">
      <a href="#club?${club._id}">
        <h1>${club.name}</h1>
      </a>
      <p>${club.description}</p>
      <div class="clubCardContent">
        <div class="nextClubEvent">
          <b>Next event:</b>
          <br>
          <a>${nextEvent.name}</a>
          <br>
          <u>${isValidDate(nextEvent.date) ? utcToDate(nextEvent.date) : ""}</u>
          <p>${nextEvent.description}</p>
        </div>
        <img src="${nextEvent.img}">
    </div>
    </article>
    `
  };

  return `<div id="event-card"> ${htmlEvent}</div>
  <div id="home">${html}</div> `
} 

const getClubEvents = async (clubId) => {
  let clubEvents = await (await fetch(`/api/clubEvents/${clubId}`)).json()
  return clubEvents
}

