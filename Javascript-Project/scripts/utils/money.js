export function formatcurrency(priceCents){

    const price =(Math.round(priceCents) /100).toFixed(2);
    return price;
}