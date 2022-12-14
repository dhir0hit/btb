// user list
let userListData = [];
let currentUser;

$(document).ready(function () {
    $.getJSON('/user/data', function (data) {
        userListData = data;
        currentUser = showUserInfo(data);

        $("#username")[0].innerHTML = currentUser.username;

        if(currentUser.businessAccount) {
            $("#business_account")[0].innerHTML = "Business Account"
        }

        $("#first_name")[0].innerHTML = currentUser.firstName;
        $("#last_name")[0].innerHTML = currentUser.lastName;
        $("#phone_number")[0].innerHTML = currentUser.phoneNumber;
        $("#Email_number")[0].innerHTML = currentUser.email;
        $("#address_line1")[0].innerHTML = currentUser.address1;
        $("#address_line2")[0].innerHTML = currentUser.address2;
        $("#city")[0].innerHTML = currentUser.city;
        $("#province")[0].innerHTML = currentUser.province;
        $("#postal_code")[0].innerHTML = currentUser.postalCode;
    })
})


function showUserInfo(data) {
    var user = $("#username_nav")[0].innerHTML;
    var position;

    for (let i = 0; i < data.length; i++) {
        if(data[i].username.toLowerCase() === user.toLowerCase()) {
            position = i;
        }
    }

    return data[position];
}
