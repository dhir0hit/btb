let productList = [];

$(document).ready(function (){
    $.getJSON('/product/getAll', function (data){
        productList = data
        productInfo(data);



    })
})


function productInfo(data){

    var id = $("#editHeading")[0].innerHTML;
    console.log(id);
    var position;

    for (let i = 0; i < data.length; i++){
        if(data[i].id == id){
            position = i;
        }
    }

    let currentProd = data[position];

    $('#name')[0].value = currentProd.name;
    $('#type')[0].value = currentProd.productType;
    $('#brandName')[0].value = currentProd.brandName;
    $('#features')[0].value = currentProd.features;
    $('#price')[0].value = currentProd.price;
    $('#stock')[0].value = currentProd.stock;
    $('#tags')[0].value = currentProd.tags;

}
