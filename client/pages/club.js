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

async function club(param) {
  const response = await fetch(`/api/club/${param}`)
  const club = await response.json()
  const ownerResponse = await fetch(`/api/club/${param}/users`)
  const clubOwners = await ownerResponse.json()
  const eventResponse = await fetch(`/api/clubEvents/${club._id}`)
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

  let eventData = ""
  for(let data of clubEvent){
    console.log(data.name)
    eventData += 
    `
    <article>
        <img src="${data.img}" class="event-image">
        <h1>${data.name}</h1>
        <h2>${data.description}</h2> 
        <h2>${data.date}</h2>

    </article>
    `
  }

  let editButton = "";
  let modalDialog = "";
  if(club.owners.includes("65ccb0cc6d32eb9c107e1fae")) { // Change to logInData.loggedIn
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

  console.log(logInData)
  console.log(param)

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

// club("param").then(content => {
//   document.querySelector(".main").innerHTML = content;

//   const editButtonElement = document.getElementById("edit-button");
//   if (editButtonElement) {
//     editButtonElement.addEventListener("click", editFunction);
//   }
// });





  // const editButtonElement = document.getElementById("edit-button");
  // if(editButtonElement) {
  //   editButtonElement.addEventListener("click", () => {
  //     console.log("Edit button clicked");
  //   })
  // }

    // if(club.owners.includes(req.session.user)) {
  //   //Edit function
  //   window.alert("You are a club owner!")
  // } else {
  //   window.alert("You are NOT a club owner!")
  // }

  // if(req.session.user = club.owners) {
  //   window.alert("Wow!")
  // }

  // let clubData = club.owners;
  // for(let data of clubData) {
  //   console.log(req.session.user, data)
  //   if(req.session.user = data) {
  //     if(window.confirm("Click confirm to edit page")) {

  //     }
  //   }
  // }