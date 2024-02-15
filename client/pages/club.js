

export default async function club(param) {
  const response = await fetch(`/api/club/${param}`)
  const club = await response.json()
  const eventResponse = await fetch(`/api/clubEvents/${club._id}`)
  const clubEvent = await eventResponse.json()
  let eventData = ""
  for(let data of clubEvent){
    console.log(data.name)
    eventData += 
    `
    <article>
        <img src="${data.img}" class="club-img">
        <h1>${data.name}</h1>
        <h2>${data.description}</h2> 
        <h2>${data.date}</h2>

    </article>
    `
  } 

  console.log(param)
  
  
    return `
    <main id="club-page">
      <section id="top-section">
        <img src="" alt="Club picture" />
        <aside id="club-info">
          <h2 id="club-name">${club.name}</h2>
          <p id="club-description">${club.description}</p>
          <ul id="club-owner">
            Club owners: <li>${club.owners}</li>
          </ul>
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