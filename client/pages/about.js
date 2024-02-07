export default async function about() {

  const response = await fetch('/api/about')
  const result = await response.json()

  console.log(result)

  let html = ''

  for (let data of result) {
    html += `
    <h1>${data.title}</h1>
    <p>${data.text}</p>
  `
  }

  return `<article id="about">${html}</article>`
}