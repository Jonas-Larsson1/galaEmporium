// let isInloggad = false

const updateNavbar = () => {
    $.get('/api/login', function (data) {
        let content = "";
        const navContainer =  $('.nav__container');
        
        navContainer.empty();

        if (data.isInloggad){
            console.log("loggedin")
            content += `
                <a href="#mypage">Mina Sidor</a>
                <a href="#cart" id="cart"><i class="fa-solid fa-cart-shopping"></i></a>
                <button id="logout-btn">Logout</button>
            `
            $('.nav__container').html(content)
            $('#logout-btn').click(function() {
                !data.isInloggad;
                updateNavbar()
            })
        } else {
            console.log(data.loggedIn)
            navContainer.append('<button id="login-btn">Logga in</button>')
            $('#login-btn').click(function() {
                console.log('clicked')
                // isInloggad = true;
                // updateNavbar()
                //ÄNDRA LOCATION TILL LOGIN SIDA
            });


        }
    })
}

export default updateNavbar;