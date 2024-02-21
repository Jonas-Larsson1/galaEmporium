import showEvents from "./event.js"
import { isClubOwner } from "../functions/general.js"

export default async function club(clubId) {
  const response = await fetch(`/api/club/${clubId}`)
  const club = await response.json()
  const ownerResponse = await fetch(`/api/club/${clubId}/users`)
  const clubOwners = await ownerResponse.json()
  const loggedInRes = await fetch('/api/login')
  const logInData = await loggedInRes.json()

  let ownerData = ""
  for(let data of clubOwners) {
    ownerData +=
    `
    <li>${data}</li>
    `
  }

  const eventData = await showEvents(clubId)

  let editButton = ``;
  if(club.owners.includes(logInData.loggedIn)) {
    editButton = `
    <a href ="#editClubPage?${club._id}" id="edit-button">Edit</a>`;
  }

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
        <span id="events-header">
          <h2>Club events</h2>
          ${editButton}
        </span>
        <div id="events-container">
            <a href ="#editEventPage" class="material-symbols-outlined">
              ${await isClubOwner(club._id) ? "Create new event" : ""} 
            </a>
              ${eventData}
        </div>
      </section>
    </main>
  `;
}