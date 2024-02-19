export default function cart(){
    
    const cartContents = JSON.parse(sessionStorage.getItem('cartContents'));
    console.log(cartContents)

    const eventIdCount = {};
    cartContents.forEach(item => {
        eventIdCount[item.event_id] = eventIdCount[item.event_id] || { count: 0, rendered: false };
        eventIdCount[item.event_id].count++;
    });

    let html = '';

    cartContents.forEach(item => {
        const eventDate = new Date(item.date);
        const formattedDate = eventDate.toLocaleDateString(); 
        const formattedTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
        
            html += `
            <div class="main-container">
            <p>${item.title}</p>
            <p>${formattedDate} ${formattedTime}</p>
            <div>
                <button class="count-btn" data-event-id="${item.event_id}">${item.amount}</button>
                <button class="increase-btn" data-event-id="${item.event_id}">+</button>
                <button class="decrease-btn" data-event-id="${item.event_id}">-</button>
            </div> 
            <div class="price" data-price-id="${item.event_id}">${item.totalPrice}</div>
            <div class="price" data-singlePrice-id="${item.event_id}">${item.price}</div>
            </div>
            `;
        
    });
    const cartDiv = document.createElement('div');
    cartDiv.classList.add('cart-container');
    
    document.body.appendChild(cartDiv);
    $('.cart-container').html(html);
    $('main').html(cartDiv);

    $('.increase-btn').click(function() {
        const eventId = $(this).data('event-id');
        increaseDecrease(eventId)
    });

    $('.decrease-btn').click(function() {
        const eventId = $(this).data('event-id');
        increaseDecrease(eventId)
    });

    const increaseDecrease = (eventId) => {
        const cartContentsIndex = cartContents.findIndex(item => {
            return item.event_id === eventId
        })
        const cartItem = cartContents[cartContentsIndex]
        cartItem.amount++; // Increment the count
        updateCartContents(); // Update the cartContents array
        $(`.count-btn[data-event-id="${eventId}"]`).text(cartItem.amount); // Update the button text
        updateTotalPrice(cartItem);
    }
    
    function updateTotalPrice(cartItem) {
        // console.log(eventId)
        // console.log(eventId.count)
        const price = ($(`.price[data-singlePrice-id="${cartItem.event_id}"]`).text())
        const count = cartItem.amount;
        const totalPrice = (price * count).toFixed(2); // Ensure two decimal places
        cartItem.totalPrice = totalPrice
        $(`.price[data-price-id="${cartItem.event_id}"]`).text(totalPrice);
        
    }
    
    // return html;
    function updateCartContents() {
        sessionStorage.setItem('cartContents', JSON.stringify(cartContents)); // Update sessionStorage with the modified cartContents
    }

}

