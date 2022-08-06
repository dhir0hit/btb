/*
// users list
let userListData=[];

$(document).ready(function () {
    let content = '';
    $.getJSON('/user/data', function (data) {
        userListData = data;
        console.log(data)

        $.each(data, function () {
            content += "<h1>" + this.username + "</h1>";
            content += "<h1>" + this.password + " </h1>";
            content += "<h1>" + this.email + "</h1>";
            content += "<h1>" + this.city + "</h1>";
        })

        $('#card_container').html(content);
    });
});
*/
