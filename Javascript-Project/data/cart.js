export const cart=[];

export function addtocart(productId){
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
}

export function updatecartQuantity(){
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity; 
    });
    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
}


