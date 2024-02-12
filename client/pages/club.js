export default async function club() {

  const response = await fetch('/api/clubs/:id')
  const result = await response.json()

  console.log(result);
  
    return `
    <article id="home">
      <h1>Welcome to ${data.name}</h1>
      <p>OBS! Glöm inte CSS.</p>
    </article>
    `
  }