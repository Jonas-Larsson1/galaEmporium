export default async function club() {

  const response = await fetch('/api/clubs/:id')
  const result = await response.json()

  console.log(result);
  
    return `
    <main>
      <section id="top-section">
        <img src="" alt="Club picture" />
        <aside id="club-info">
          <h2 id="club-name">${data.name}</h2>
          <p id="club-description">${data.description}</p>
          <ul id="club-owner">
            Club owners: <li>${data.owners[0]}</li>
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
    document.querySelector(".main").innerHTML = content;
  }