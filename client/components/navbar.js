const updateNavbar = () => {
    $.get('/api/login', function (data) {
        const navContainer =  $('.nav__container');
        navContainer.empty();

        let content = "";

        if (data.loggedIn){
            console.log("Användaren är inloggad")
            content += `
                <a href="#mypage" id="mypage">Mina Sidor</a>
                <a href="#cart" id="cart"><i class="fa-solid fa-cart-shopping"></i></a>
                <button id="logout-btn">Logout</button>
            `
            // navContainer.html(content)
            // $('#logout-btn').click(function() {
            //     fetch('/api/login', { 
            //         method: 'DELETE',
            //       })
            //       .then(response => response.json())
            //       .then(data => {
            //         if (response.ok) {
            //           alert(data.message);
            //           window.location.hash = '#login'; 
            //           updateNavbar(); // Refresh navbar to reflect logged-out state
            //         } else {
            //             alert(data.message)
            //         }
            //       })
            //       .catch(error => 
            //         {
            //             console.error("Det gick inte att logga ut", error);
            //             alert("Fel vid utloggning")
            //         });
            //     });
            } else {
                console.log("Användaren är inloggad", data.loggedIn)
                content = '<button id="login-btn">Logga in</button>'
            }

            navContainer.html(content)

            $('#logout-btn').click(function() {
                fetch('/api/login', { 
                    method: 'DELETE',
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to logout');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Successfully logged out.');
                    window.location.hash = '#login'; 
                    updateNavbar(); // Refresh navbar to reflect logged-out state
                })
                .catch(error => {
                    console.error("Logout failed", error);
                    alert("Logout error");
                });
            });


            $('#login-btn').click(function() {
                console.log('clicked')
                // isInloggad = true;
                // updateNavbar()
                //ÄNDRA LOCATION TILL LOGIN SIDA
                window.location.hash = "#login"
            });


        })
    }

export default updateNavbar;