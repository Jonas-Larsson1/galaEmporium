export default function login() {
  let loginContent = "";

  loginContent += `
    <form id="login">
      <input type="email" name="email" placeholder="Email" required>
      <input type="password" name="password" placeholder="Lösenord" required>
      <button type='submit'>LOGGA IN</button>
      <a href="#register" class="register">Registrera dig</a>
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
      // alert('Login successful!');
      window.location.hash = '#mypage';
    } else {
      // alert('Login failed: Invalid email or password.');
    }
  })
  .catch(error => {
    console.error('Error during login:', error);
  });

}

