

export default function mypage() {
   let content = "";
   const userId = sessionStorage.getItem('userId');
   let html = `<div id='container-xl'></div>`
       $.get(`/api/booking/user/${userId}`, function (data) {
        if (userId) {
          console.log("User ID:", userId);
          data.forEach(booking => {
            const buttonClass = booking.paid ? "paid" : "pay";
            const disabledAttribute = booking.paid ? "disabled" : "";

            content += `
        <div class="container">
          <p>${booking.event_id.description}</p>
          <p>${booking.seats_reserved}</p>
          <button class="${buttonClass}" ${disabledAttribute}>${booking.paid ? "OK" : "BETALA"}</button>
        </div> 
      `
      
    });
    
    $('#container-xl').html(content);
       }    else {
        console.log('User ID är inte tillgänglig')
       }
       
   })

   
   return html;
   
}