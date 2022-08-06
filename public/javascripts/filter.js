
$(document).ready(function (){
    let search_bar = $("#searchBar")
    console.log(search_bar);

    $("#search_btn").on("click", function (event) {
        event.preventDefault();

        let filter_input = search_bar[0].value

        window.location.href = "/product/filter/" + filter_input;
    })
});
