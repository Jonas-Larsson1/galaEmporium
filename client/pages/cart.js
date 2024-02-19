let cartContents
export default function cart(){
    cartContents = JSON.parse(sessionStorage.getItem('cartContents'));
    let cartItemsHtml = ''
    cartContents.forEach(item => {
        console.log(item)
        const eventDate = new Date(item.date);
        const formattedDate = eventDate.toLocaleDateString(); 
        const formattedTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
        
        cartItemsHtml += `
            <div class="main-container">
                <p>${item.title}</p>
                <p>${formattedDate} ${formattedTime}</p>
            <div>
                <button class="count-btn" data-event-id="${item.event_id}">${item.amount}</button>
                <button class="increase-btn" onclick="increaseDecrease('${item.event_id}', 'add');" data-event-id="${item.event_id}">+</button>
                <button class="decrease-btn" onclick="increaseDecrease('${item.event_id}', 'sub');" data-event-id="${item.event_id}">-</button>
            </div> 
                <div class="price" data-price-id="${item.event_id}">${item.totalPrice}</div>
                <div class="price" data-singlePrice-id="${item.event_id}">${item.price}</div>
            </div>

        `;
        
    });

    let html = `
    <div class="cart-container">
        ${cartItemsHtml}
    </div>
    `
    // const cartDiv = document.createElement('div');
    // cartDiv.classList.add('cart-container');
    
    // document.body.appendChild(cartDiv);
    // $('.cart-container').html(html);
    // $('main').html(cartDiv);


    
    return html;
}

const increaseDecrease = (eventId, operator) => {
    const cartContentsIndex = cartContents.findIndex(item => {
        return item.event_id === eventId
    })
    const cartItem = cartContents[cartContentsIndex]
    if (operator == "add") {
        cartItem.amount++
    } else {
        cartItem.amount--
    }
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

function updateCartContents() {
    sessionStorage.setItem('cartContents', JSON.stringify(cartContents)); // Update sessionStorage with the modified cartContents
}

window.increaseDecrease = increaseDecrease