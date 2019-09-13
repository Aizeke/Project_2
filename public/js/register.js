$(document).ready(function () {
    $("#signupSubmit").on("click", function (e) {
        var userInfo = {
            username: $("#username").val().trim(),
            displayName: $("#diplayName").val().trim(),
            password: $("#password1").val().trim()
        }
        var pword = $("#password1").val().trim();
        var pword2 = $("#password2").val().trim();
        if (pword === pword2) {
            axios.post('/api/users', userInfo)
                .then(function () {
                    window.location.replace("/dashboard")
                })
                .catch(function (err) {
                    console.log(err)
                })
        } else {
            // error passwords don't match
            $(".warning").html("<h5>Error: Passwords do not match.</h5>");
        }
    })
})
