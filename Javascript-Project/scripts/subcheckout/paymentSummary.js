import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getdeliverOption } from "../utils/deliveryoptions.js";
import { formatcurrency } from "../utils/money.js";


export function renderPaymentSumary(){
    let productPriceCents=0;
    let ShippingPricecents =0;
    cart.forEach((cartItem) => {
       const product =getProduct(cartItem.productId);
       productPriceCents+= product.priceCents * cartItem.quantity;

       const deliverOption =getdeliverOption(cartItem.deliveroptionid);
       ShippingPricecents +=deliverOption.priceCents;
        
    });
    // console.log(productPriceCents);
    // console.log(ShippingPricecents);
    const totalbeforetax=productPriceCents+ShippingPricecents;
    const tax=(totalbeforetax * 0.1);
    const totalCents=totalbeforetax +tax;


    let paymentSummaryHTML =


    `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">${formatcurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatcurrency(ShippingPricecents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatcurrency(totalbeforetax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatcurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatcurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
    `;

    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML

}