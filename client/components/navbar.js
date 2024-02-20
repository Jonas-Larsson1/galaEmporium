const updateNavbar = () => {
    $.get('/api/login', function (data) {
        const navContainer =  $('.nav__container');
        navContainer.empty(); // tömmer container

        let content = "";
// NAVBAR OM USER ÄR INLOGGAD
        if (data.loggedIn){
            // console.log("Användaren är inloggad")
            sessionStorage.setItem('userId', data.loggedIn); // sparas i session storage
            // navbar om användaren är inloggad
            content += `
                <a href="#mypage" id="mypage">Mina Sidor</a>
                <a href="#cart" id="cart"><i class="fa-solid fa-cart-shopping"></i></a>
                <button id="logout-btn">Logout</button>
            `
// NAVBAR OM USER INTE ÄR INLOGGAD
            } else {
                // console.log("Användaren är inloggad", data.loggedIn)
                content = '<button id="login-btn">Logga in</button>'
            }

            navContainer.html(content) // html läggs till i navContainer

            $('#logout-btn').click(function() {
                fetch('/api/login', { 
                    method: 'DELETE',
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Gick inte att logga ut');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Du är utloggad.');
                    window.location.hash = '#login'; 
                    updateNavbar(); 
                })
                .catch(error => {
                    console.error('Gick inte att logga ut', error);
                    alert('Fel vid utloggning');
                });
            });


            $('#login-btn').click(function() {
                // console.log('clicked')
                window.location.hash = "#login"
            });


        })
    }

export default updateNavbar;