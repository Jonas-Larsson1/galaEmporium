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
        if (eventIdCount[item.event_id].count > 1) {
            if (!eventIdCount[item.event_id].rendered) {
                html += `
                <div class="main-container">
                <p>${item.title}</p>
                <p>${formattedDate} ${formattedTime}</p>
                <div>
                    <button class="count-btn" data-event-id="${item.event_id}">${eventIdCount[item.event_id].count}</button>
                    <button class="increase-btn" data-event-id="${item.event_id}">+</button>
                    <button class="decrease-btn" data-event-id="${item.event_id}">-</button>
                </div>
                <div>${eventIdCount[item.event_id].count * item.price}</div>
                </div>
                `;
                eventIdCount[item.event_id].rendered = true;
            }
        } else {
            html += `
            <div class="main-container">
            <p>${item.title}</p>
            <p>${formattedDate} ${formattedTime}</p>
            <div>
                <button class="count-btn" data-event-id="${item.event_id}">${eventIdCount[item.event_id].count}</button>
                <button class="increase-btn" data-event-id="${item.event_id}">+</button>
                <button class="decrease-btn" data-event-id="${item.event_id}">-</button>
            </div> 
            <div class="price" data-price-id="${item.event_id}">${item.price}</div>
            <div class="price" data-singlePrice-id="${item.event_id}">${item.price}</div>
            </div>
            `;
        }
    });
    const cartDiv = document.createElement('div');
    cartDiv.classList.add('cart-container');
    
    document.body.appendChild(cartDiv);
    $('.cart-container').html(html);
    $('main').html(cartDiv);

    $('.increase-btn').click(function() {
        console.log('Increase button clicked'); 
        const eventId = $(this).data('event-id');
        eventIdCount[eventId].count++; // Increment the count
        updateCartContents(eventId, eventIdCount[eventId].count); // Update the cartContents array
        // $(this).prev('.count-btn').text(eventIdCount[eventId].count); // Update the button text
        $(`.count-btn[data-event-id="${eventId}"]`).text(eventIdCount[eventId].count); // Update the button text
        updateTotalPrice(eventId);
    
    });

    $('.decrease-btn').click(function() {
        console.log('Decrease button clicked'); 
        const eventId = $(this).data('event-id');
        eventIdCount[eventId].count--; // Increment the count
        // $(this).prev('.count-btn').text(eventIdCount[eventId].count); // Update the button text
        // if (eventIdCount[eventId].count === 0) {
        //     removeItemFromCart(eventId); // Remove item if count becomes 0
        // } else {
        //     updateCartContents(eventId, eventIdCount[eventId].count); // Update the cartContents array
        // }
        $(`.count-btn[data-event-id="${eventId}"]`).text(eventIdCount[eventId].count); // Update the button text
        updateTotalPrice(eventId);
    });
    
    function updateTotalPrice(eventId) {
        console.log(eventId)
        // console.log(eventId.count)
        const price = ($(`.price[data-singlePrice-id="${eventId}"]`).text())
        const count = eventIdCount[eventId].count;
        console.log(count)
        console.log(price)
        const totalPrice = (price * count).toFixed(2); // Ensure two decimal places
        $(`.price[data-price-id="${eventId}"]`).text(totalPrice);
        
    }
    
    // return html;
    function updateCartContents() {
        sessionStorage.setItem('cartContents', JSON.stringify(cartContents)); // Update sessionStorage with the modified cartContents
    }

}

