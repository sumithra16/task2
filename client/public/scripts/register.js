function register() {
    let user_Register = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        password_again: document.getElementById("password-again").value,

    }
    if (user_Register.password != user_Register.password_again) {
        return alert('password not match');
    }
    console.log(user_Register);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        console.log(this.response);
        if (this.readyState == 4) {
            if (this.status == 300) {
                alert(this.response);
                window.location = "register";

            }
            if (this.status == 301) {
                alert(this.response);
                window.location = "register";

            }
            if (this.status == 200) {
                alert('Registered Successfully');

                localStorage.setItem('myObj', (this.responseText));
                window.location = "Home_page";

            } if (this.status == 401) {
                alert(this.response);
                window.location = "register";

            }

        }
    };
    xhttp.open("POST", "/userRegister", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user_Register));


}





