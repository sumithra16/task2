$(document).ready(function () {
    $("#login").click(function () {
        var user_Register = new Object();
        user_Register.email = $("#email").val();
        user_Register.password = $("#password").val();


        $.ajax({
            url: '/userLogin',
            type: 'POST',
            dataType: 'json',
            data: user_Register,
            success: function (data, textStatus, xhr) {
                alert("logined successfully");
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