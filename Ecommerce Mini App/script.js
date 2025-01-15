document.addEventListener("DOMContentLoaded",()=>{
    
    const products=[
        {id:1,name:"Product1",price:29.99},
        {id:2,name:"Product2",price:89.99},
        {id:3,name:"Product3",price:59.99},
    ];
    let cart= JSON.parse(localStorage.getItem("cart")) || [];

    const productList=document.getElementById("product-list");
    const cartItems=document.getElementById("cart-items");
    const emptyCartMessage=document.getElementById("empty-cart");
    const cartTotalMessage=document.getElementById("cart-total");
    const totalPriceDisplay=document.getElementById("total-price");
    const checkoutBtn=document.getElementById("checkout-btn");

    if(cart.length>0){
        renderCart();
        emptyCartMessage.classList.add("hidden");
        cartTotalMessage.classList.remove("hidden");
    }

    products.forEach(ele => {
        const productDiv=document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML=`
        <span>${ele.name} - $${ele.price.toFixed(2)}</span>
        <button data-id="${ele.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    })

    productList.addEventListener('click',(e)=>{
        if(e.target.tagName==='BUTTON'){
            const productId=parseInt(e.target.getAttribute('data-id'));
            const product=products.find(p => p.id === productId);
            addToCart(product);
        }
    })

    function addToCart(product){
        cart.push(product);
        saveCart();
        renderCart();
    }

    function renderCart(){
        cartItems.innerHTML="";
        let totalPrice=0;
        if(cart.length>0){
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((item,index)=>{
                totalPrice+=item.price;
                const cartItem=document.createElement("div");
                cartItem.classList.add('cart');
                cartItem.innerHTML=`
                    ${item.name} - $${item.price.toFixed(2)}
                    <button data-id="${item.id}">Remove</button>
                `;
                cartItems.appendChild(cartItem);
                totalPriceDisplay.textContent=`${totalPrice.toFixed(2)}`;
            });
        }else{
            cartItems.innerHTML="Your cart is empty.";
            emptyCartMessage.classList.remove("hidden");
            cartTotalMessage.classList.add("hidden");
        }
    }

    checkoutBtn.addEventListener('click',()=>{
        cart.length=0;
        saveCart();
        alert("Checkout successfully");
        renderCart();
    })

    function saveCart(){
        localStorage.setItem("cart",JSON.stringify(cart));
    }

    cartItems.addEventListener('click',(eve)=>{
        if(eve.target.tagName==='BUTTON'){
            const ID=parseInt(eve.target.getAttribute("data-id"));
            cart=cart.filter((item)=> item.id !== ID);
            saveCart();
            renderCart();
        }
    });
    
})