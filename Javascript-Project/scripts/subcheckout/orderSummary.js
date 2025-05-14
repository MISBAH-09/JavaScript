
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

import { cart ,removefromcart ,updatedeliveryoption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { deliveryOptions , getdeliverOption } from "../utils/deliveryoptions.js";

const today=dayjs();
const Deliverydate= today.add(7,'days');
console.log(Deliverydate.format('dddd, MMMM D'));

export function renderOrderSummary(){
        let cartSummaryHTml='';

    cart.forEach((cartItem)=>{
        const productId=cartItem.productId;

        let matchingproduct=getProduct(productId);

        const deliveroptionid = cartItem.deliveroptionid;
        let deliverOption = getdeliverOption(deliveroptionid);

        const today = dayjs();
        const deliveryDays = Number(deliverOption.deliverydays);
        if (isNaN(deliveryDays)) {
        console.warn('Invalid deliveryDays:', deliverOption.deliverydays);
        return; // Skip this entry if deliveryDays is not a valid number
        }

    const deliveryDate = today.add(deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTml +=`
        <div class="cart-item-container 
        js-cart-item-container-${matchingproduct.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingproduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingproduct.name}
                    </div>
                    <div class="product-price">
                    ${(matchingproduct.priceCents /100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                ${deliveryOptionHTML(matchingproduct,cartItem)}
                </div>
                </div>
            </div>
        
        `;

    });

    function deliveryOptionHTML(matchingProduct,cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        // console.log("Raw deliveryDays:", deliveryOption.deliverydays);

        const deliveryDays = Number(deliveryOption.deliverydays);
        if (isNaN(deliveryDays)) {
            console.warn('Invalid deliveryDays:', deliveryOption.deliverydays);
            return; // Skip this entry if deliveryDays is not a valid number
        }

        const deliveryDate = today.add(deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${(deliveryOption.priceCents / 100).toFixed(2)}`;

        let ischecked= deliveryOption.deliveryid===cartItem.deliveroptionid;

        html += `
        <div class="delivery-option js-delivery-option"
        data-product-id=${matchingProduct.id}
        data-delivery-id =${deliveryOption.deliveryid}
        >
            <input type="radio"
                ${ischecked? 'Checked' : ''} 
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
                ${priceString} - Shipping
            </div>
            </div>
        </div>
        `;
    });

    return html;
    }

    document.querySelector('.js-order-container').innerHTML=cartSummaryHTml;

    document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
        link.addEventListener('click',()=>{

            const productId= link.dataset.productId;
            // console.log(productId);
            removefromcart(productId);
            // console.log(cart);

            const container=document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            
        });
    });

    document.querySelectorAll('.js-delivery-option')
    .forEach((option)=>{
        option.addEventListener('click', ()=>{
            // console.log(option.dataset); // ✅ use 'option'
            const {productId, deliveryId} = option.dataset;
            updatedeliveryoption(productId, deliveryId);
            renderOrderSummary();
        });
    });


}

