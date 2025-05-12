let cart = JSON.parse(localStorage.getItem('cart'));

if (!Array.isArray(cart)) {
  cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 2
    }
  ];
}

function savetostorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addtocart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }

  savetostorage();
}

export function updatecartQuantity(){
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity; 
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

export function removefromcart(productId){
  const newcart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId)
      newcart.push(cartItem);
  });

  cart = newcart;
  savetostorage();   
}

export { cart };
