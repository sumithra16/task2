$(document).ready(function () {
    $("#register").click(function () {
        // var user_Register = new Object();
        // user_Register.name = $("#username").val();
        // user_Register.email = $("#email").val();
        // user_Register.password = $("#password").val();
        // user_Register.cpassword = $("#password-again").val();
        var user_Register = $("form").serialize();
        console.log("serialixed one", user_Register)
        if (user_Register.password != user_Register.cpassword) {
            console.log("password error");

            $('#message').text('Password incorrect');

        }
        $.ajax({
            url: '/userRegister',
            type: 'POST',
            dataType: 'json',
            data: user_Register,
            success: function (data, textStatus, xhr) {
                alert("registerd successfully");
                window.location = "home_page";
                console.log(data);

            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr.responseText);
                $('#message').html(xhr.responseText);
            }

        });
    });
});