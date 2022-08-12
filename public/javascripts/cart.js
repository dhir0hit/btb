let imageList = ["images/item/1.png",
    "images/item/2.jpg",
    "images/item/3.jpg",
    "images/item/4.jpg",
    "images/item/5.jpg",
    "images/item/6.jpg",
    "images/item/7.jpg",
    "images/item/8.jpg",
    "images/item/9.jpg",
    "images/item/10.jpg",
    "images/item/11.webp",
    "images/item/12.jpg",
    "images/item/13.jpg",
    "images/item/14.webp",
    "images/item/15.jpg",
    "images/item/16.png",
    "images/item/17.webp",
    "images/item/18.png"]

$(document).ready(function () {
    let cartIdList;
    let productList;
    const node = document.createTextNode("This is new.");

    const cartItem = document.createElement("div");
    const cartItemDetail = document.createElement("div")



    // it is an string array
    cartIdList = $("#cart_info")[0].innerHTML.split(",");

    $.getJSON('/product/getAll', function (data){
        productList = data;

        for (let item in cartIdList) {
            item = parseInt(item);
            $(".cart_item_container").append(`<div class="cart_item"><div class="cart_item_detail"><div class="graphic"><img src="/${imageList[item]}"></div><div class="info"><h2>${productList[item].name}</h2><h4>${productList[item].brandName}</h4></div></div><div><h4>${productList[item].price}</h4></div></div>`);
        }
    })
})



function findProduct(productList, userCartList) {
    let userCartProducts = [];
    for(let product in productList) {
        if (userCartList.includes(`${product}`)) {
            userCartProducts.push(product);
        }
    }
    return userCartProducts;
}
