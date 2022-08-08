// Users list
let userListData=[];

$(document).ready(function () {
    let content = '';
    $.getJSON('/user/data', function (data) {
        userListData = data;
        console.log(data)


    });
});

function showImage(image) {

}
