export default async function club(param) {

  console.log(param)
  const response = await fetch(`/api/club/${param}`)
  const club = await response.json()
  
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
            <article></article>
            <article></article>
            <article></article>
        </div>
      </section>
    </main>
    `
  }