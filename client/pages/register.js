export default function register() {
    let registerContent = "";
  
    registerContent += `
      <form id="register">
        <input class="register-input" type="text" name="name" placeholder="Ange ditt namn" required>
        <input class="register-input" type="email" name="email" placeholder="Email" required>
        <input class="register-input" type="password" name="password" placeholder="Lösenord" required>
        <button class="submit" type='submit'>SKAPA KONTO</button>
      </form>
    `
   
    $('main').html(registerContent)
    $('#register').on('submit', submitForm);
  }

  async function submitForm(event) {
    event.preventDefault();
    // console.log('submitted')
    const data = {
      name: $('#register [name="name"]').val(),
      email: $('#register [name="email"]').val(),
      password: $('#register [name="password"]').val()
    }
    // console.log(data)
    
  fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    // console.log('Login response:', data);
    $('#register [name="name"]').val(''),
    $('#register [name="email"]').val(''),
    $('#register [name="password"]').val('')
    if (data.user_id) {
      alert('Du är registrerad! Det är dags att logga in');
      window.location.hash = "#login"
    } else {
      alert('FEL ' + data.message);
    }
  }) 
  
  .catch(error => {
    console.error('Fel vid registrering:', error);
    alert('Registreringen misslyckades.');
    });
  }
 
  
  


  // ADD SUCCESS ALERT
  // ADD ERROR IN RED 
  // ÄNDRA LOCATION VID SUCCESS