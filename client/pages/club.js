// import { utcToDate, isValidDate } from "../functions/utcToDate.js"
import showEvents from "./event.js"
export default async function club(clubId) {
  const response = await fetch(`/api/club/${clubId}`)
  const club = await response.json()
  const ownerResponse = await fetch(`/api/club/${clubId}/users`)
  const clubOwners = await ownerResponse.json()
  const eventResponse = await fetch(`/api/clubEvents/${clubId}`)
  const clubEvent = await eventResponse.json()
  let ownerData = ""
  for(let data of clubOwners) {
    ownerData +=
    `
    <li>${data}</li>
    `
  }

  // let eventData = ""
  // for(let data of clubEvent){
  //   // console.log(data.name)
  //   eventData += 
  //   `
  //   <article>
  //       <img src="${data.img}" class="event-image">
  //       <h1>${data.name}</h1>
  //       <h2>${data.description}</h2> 
  //       <h2>${isValidDate(data.date) ? utcToDate(data.date) : ""}</h2>

  //   </article>
  //   `
  // }

  const eventData = await showEvents(clubId)

  // console.log(param)
  
  
    return `
    <main id="club-page">
      <section id="top-section">
        <img src="${club.image}" alt="Club picture" />
        <aside id="club-info">
          <h2 id="club-name">${club.name}</h2>
          <p id="club-description">${club.description}</p>
          <ul id="club-owner">Club owners: ${ownerData}</ul>
        </aside>
      </section>
      <section id="bottom-section">
        <h2 id="events-header">Club events</h2>
        <div id="events-container">
              ${eventData}
        </div>
      </section>
    </main>
    `
  }