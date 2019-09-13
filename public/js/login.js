$(document).ready(function () {
    $("#loginSubmit").on("click", function (event) {
        var email = $("#username").val().trim();
        var password = $("#password").val().trim();

        $.get("/api/login", function (data) {
            
            if (data != username && password) {
                $(".form-group").append("<h2>No record matches your input</h2>");
            }
            else {
                window.location.replace("/dashboard")
                
            }
        });



    });

})