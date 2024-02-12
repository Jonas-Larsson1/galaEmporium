

const updateNavbar = () => {
    $.get('/api/login', function (data) {
        const navContainer = $('.nav__container');
        navContainer.empty();

        if (data.loggedIn){
            console.log("loggedin")
            navContainer.append('<a href="#mypage">Mina Sidor</a>');
            navContainer.append('<a href="#cart" id="cart"><i class="fa-solid fa-cart-shopping"></i></a>');
            navContainer.append('<button id="logout-btn">Logout</button>');
        } else {
            console.log(data.loggedIn)
            navContainer.append('<button id="login-btn">Logga in</button>')
            $('#login-btn').click(function() {
                console.log('clicked')
                // ändra location till login-sida
                window.location.href = '/login'; 
            });

        }
    })
}


export default updateNavbar;