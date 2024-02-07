export default function contact() {

  return `
    <form id="contact" onsubmit="submitForm(); return false">
      <h1>Contact</h1>
      <input type="text" name="name" placeholder="Ange ditt namn">
      <input type="email" name="email" placeholder="Ange din email">
      <label>Ange ditt meddelande
        <textarea name="message"></textarea>
      </label>
      <input type="submit" value="Skicka ditt meddelande">
    </form>
  `
}

async function submitForm() {
  console.log('submitted')
  const data = {
    name: $('#contact [name="name"]').val(),
    email: $('#contact [name="email"]').val(),
    message: $('#contact [name="message"]').val()
  }
  console.log(data)
  const result = await fetch('/api/contact', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  console.log('result', result)
  if (result.status == 200) {
    location.href = ""
  }
}

window.submitForm = submitForm