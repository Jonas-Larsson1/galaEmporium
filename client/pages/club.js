
export default async function club(param) {
  const response = await fetch(`/api/club/${param}`)
  const club = await response.json()
  const ownerResponse = await fetch(`/api/club/${param}/users`)
  const clubOwners = await ownerResponse.json()
  const eventResponse = await fetch(`/api/clubEvents/${club._id}`)
  const clubEvent = await eventResponse.json()
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
        <h2 id="events-header">Club events</h2>
        <div id="events-container">
              ${eventData}
        </div>
      </section>
    </main>
    `
    document.querySelector(".main").innerHTML = content;
  }