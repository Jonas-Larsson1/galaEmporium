export default async function home() {

  let html = ``

  let res = await fetch('/api/club')
  let clubs = await res.json()

  clubs.forEach(club => {
    console.log(club)
  });

  return `<div id="home">${html}</div>`
}