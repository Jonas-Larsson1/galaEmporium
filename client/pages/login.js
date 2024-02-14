import updateNavbar from '../components/navbar.js'

export default function login() {
  let loginContent = "";

  loginContent += `
    <form id="login">
      <input class="login-input" type="email" name="email" placeholder="Email" required>
      <input class="login-input" type="password" name="password" placeholder="Lösenord" required>
      <button class="submit" type='submit'>LOGGA IN</button>
      <a href="#register" class="register">SKAPA KONTO</a>
    </form>
  `
 
  $('main').html(loginContent)
  $('#login').on('submit', submitForm);
}

 async function submitForm(event) {
  event.preventDefault();
  console.log('submitted')

  const data = {
    email: $('#login [name="email"]').val(),
    password: $('#login [name="password"]').val()
  }
  console.log(data)

  
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  .then(response => response.json())
  .then(data => {
    
    if (data.loggedIn) {
      alert('Du är inloggad!');
      window.location.hash = '#mypage';
      // updateNavbar();
    } else {
      alert('Gick inte att logga in: fel lösenord eller mailadress.');
    }
  })
  .catch(error => {
    console.error('Fel vid inloggning:', error);
    alert('Gick inte att logga in.');
  });

}

