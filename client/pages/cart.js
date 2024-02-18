

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
        if (eventIdCount[item.event_id].count > 1) {
            if (!eventIdCount[item.event_id].rendered) {
                html += `
                <p>${item.title}</p>
                <button class="count-btn" data-event-id="${item.event_id}">${eventIdCount[item.event_id].count}</button>
                <button class="increase-btn" data-event-id="${item.event_id}">+</button>
                <button class="decrease-btn" data-event-id="${item.event_id}">-</button>
                `;
                eventIdCount[item.event_id].rendered = true;
            }
        } else {
            html += `
            <p>${item.title}</p>
            <button class="count-btn" data-event-id="${item.event_id}">${eventIdCount[item.event_id].count}</button>
            <button class="increase-btn" data-event-id="${item.event_id}">+</button>
            <button class="decrease-btn" data-event-id="${item.event_id}">-</button> 
            `;
        }
    });

    $('main').html(html);

    $('.increase-btn').click(function() {
        console.log('Increase button clicked'); 
        const eventId = $(this).data('event-id');
        eventIdCount[eventId].count++; // Increment the count
        updateCartContents(eventId, eventIdCount[eventId].count); // Update the cartContents array
        // $(this).prev('.count-btn').text(eventIdCount[eventId].count); // Update the button text
        $(`.count-btn[data-event-id="${eventId}"]`).text(eventIdCount[eventId].count); // Update the button text
    
    });

    $('.decrease-btn').click(function() {
        console.log('Decrease button clicked'); 
        const eventId = $(this).data('event-id');
        eventIdCount[eventId].count--; // Increment the count
        // $(this).prev('.count-btn').text(eventIdCount[eventId].count); // Update the button text
        if (eventIdCount[eventId].count === 0) {
            removeItemFromCart(eventId); // Remove item if count becomes 0
        } else {
            updateCartContents(eventId, eventIdCount[eventId].count); // Update the cartContents array
        }
        $(`.count-btn[data-event-id="${eventId}"]`).text(eventIdCount[eventId].count); // Update the button text

    });


    // return html;
    function updateCartContents() {
        sessionStorage.setItem('cartContents', JSON.stringify(cartContents)); // Update sessionStorage with the modified cartContents
    }
    
}
