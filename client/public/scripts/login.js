
function login() {

    let user_login = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        console.log(this.response);
        if (this.readyState == 4) {
            if (this.status == 301) {

                window.location = "login";
                alert(this.response);

            }

            if (this.status == 200) {
                alert('Login Successfully');

                localStorage.setItem('myObj', (this.responseText));
                window.location = "Home_page";

            }
        };
    }
    xhttp.open("POST", "/userLogin", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user_login));
}