export default function cart() {

    
    let cart_content = "";
    cart_content += `
    <article id="home">
      <h1>Cart</h1>
      
    </article>
    `
    document.querySelector(".main").innerHTML =  cart_content;
  }