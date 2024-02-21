export default async function mypage() {
   let content = "";
   const userId = JSON.parse(sessionStorage.getItem('userId'))
  //  console.log(userId)
   let html = `<div id='container-xl'></div>`
       $.get(`/api/booking/user/${userId.loggedIn}`, function (data) {
        if (userId) {
          // console.log("User ID:", userId);
          // console.log(data.length)
          if (data.length == 0) {
            content += "<h1>Inga evenemang är bokade</h1>"
          } else {
            data.forEach(booking => {
              
              const buttonClass = booking.paid ? "paid" : "pay";
              const disabledAttribute = booking.paid ? "disabled" : "";

              const eventDate = new Date(booking.event_id.date);
              const formattedDate = eventDate.toLocaleDateString(); 
              const formattedTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 

              content += `
          <div class="container">
            <img class='container_img' src=${booking.event_id.img}>
            <p>${booking.event_id.name}</p>
            <p>${formattedDate} ${formattedTime}</p>
            <p>${booking.event_id.cost} SEK</p>
            <p>${booking.seats_reserved}</p>
            <button class="${buttonClass} container-button" ${disabledAttribute}>${booking.paid ? "OK" : `${booking.event_id.cost * booking.seats_reserved} SEK`}</button>
          </div> 
        `
        
      })};
      
      $('#container-xl').html(content);
       }    else {
        // console.log('User ID är inte tillgänglig');
        ;
       }
      //  $('#container-xl').html(content);
   })

   
   return html;
   
}