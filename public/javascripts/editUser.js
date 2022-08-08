let userListData = [];

$(document).ready(function () {
    $.getJSON('/user/data', function (data) {
        userListData = data
         fillUserInfo(data);

        $("#reset").on("click", function (event) {
            event.preventDefault();
            fillUserInfo(data);
        });
    })
});

function fillUserInfo(data) {
    var user = $("#username_nav")[0].innerHTML;
    console.log(user);
    var position;

    for (let i = 0; i < data.length; i++) {
        if(data[i].username.toLowerCase() === user.toLowerCase()) {
            position = i;
        }
    }

    let currentUser = data[position];

    $('#first_name')[0].value = currentUser.firstName;
    $('#last_name')[0].value = currentUser.lastName;

    $('#phone_number')[0].value = currentUser.phoneNumber;
    $('#email')[0].value = currentUser.email;

    $('#user_name')[0].value = currentUser.username;
    $('#password')[0].value = currentUser.password;

    $('#address_l1')[0].value = currentUser.address1;
    $('#address_l2')[0].value = currentUser.address2;

    $('#city')[0].value = currentUser.city;
    $('#province')[0].value = currentUser.province;
    $('#postal_code')[0].value = currentUser.postalCode;

    $("#business_account")[0].checked = currentUser.businessAccount;

}
