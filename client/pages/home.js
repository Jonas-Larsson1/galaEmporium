export default async function home() {

  let html = ``

  let res = await fetch('/api/club')
  let clubs = await res.json()

  clubs.forEach(club => {
    html += `
    <article class="clubCard">
      <h1>${club.name}</h1>
      <p>${club.description}</p>
    </article>
    `
  });

  return `<div id="home">${html}</div>`
} 