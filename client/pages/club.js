// import { utcToDate, isValidDate } from "../functions/utcToDate.js"
import showEvents from "./event.js"
import { isClubOwner } from "../functions/general.js"

//wait for edit button click
const editClick = () => {
  const editButtonElement = document.getElementById("edit-button");
  if (editButtonElement) {    
    editButtonElement.addEventListener("click", editFunction);
  }
}

//listen for confirm or cancel click
const editFunction = () => {

  const dialogElement = document.getElementById("edit-dialog");
  dialogElement.style.display = "flex";

  const cancelButtonElement = document.getElementById("cancel-button");
  cancelButtonElement.addEventListener("click", () => {
    dialogElement.style.display = "none";
  });

  const confirmButtonElement = document.getElementById("confirm-button");
  confirmButtonElement.addEventListener("click", () => {
    // Editing the club page
    console.log("Editing the club page...");

    dialogElement.style.display = "none";
  });
}

async function club(clubId) {
  const response = await fetch(`/api/club/${clubId}`)
  const club = await response.json()
  const ownerResponse = await fetch(`/api/club/${clubId}/users`)
  const clubOwners = await ownerResponse.json()
  const eventResponse = await fetch(`/api/clubEvents/${clubId}`)
  const clubEvent = await eventResponse.json()
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

  let editButton = "";
  let modalDialog = "";
  if(club.owners.includes(logInData.loggedIn)) {
    editButton = `<button id="edit-button">Edit</button>`;
    modalDialog = `
    <div id="edit-dialog" class="modal-dialog">
      <div class="modal-content">
        <h2>Confirmation</h2>
        <p>Are you sure you want to edit the page?</p>
        <div class="modal-actions">
          <button id="cancel-button">Cancel</button>
          <button id="confirm-button">Confirm</button>
        </div>
      </div>
    </div>
    `;
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
      ${modalDialog}
    </main>
  `;
}

const funcs = {
  "club" : club,
  "editClick" : editClick
}

export default funcs;
