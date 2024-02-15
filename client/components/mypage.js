
export default function mypage() {
   let content = "";
   const userId = sessionStorage.getItem('userId');
       $.get(`/api/booking/user/${userId}`, function (data) {
        if (userId) {
          console.log("User ID:", userId);
          data.forEach(booking => {
          content += `
        <div>
          <h1>${booking.event_id.description}</h1>
          <p>${booking.seats_reserved}</p>
          <p>${booking.paid}</p>
          
        </div>
      `
    });
      $('main').html(content)
       }    else {
        console.log('User ID är inte tillgänglig')
       }

   })
}