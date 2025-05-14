export const deliveryOptions=[{
    deliveryid:'1',
    deliverydays:7,
    priceCents: 0
},{
     deliveryid:'2',
    deliverydays:3,
    priceCents: 499
},{
     deliveryid:'3',
    deliverydays:1,
    priceCents: 999
}];


export function getdeliverOption(deliveroptionid){
     let deliverOption;
        deliveryOptions.forEach((option) => {
        if (option.deliveryid === deliveroptionid) {
            deliverOption = option;
        }
        });
        return deliverOption || deliveryOptions[0];
} 