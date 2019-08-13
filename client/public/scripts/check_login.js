function myFunction() {

    let myObjL = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        console.log(this.readyState, this.response, this.status);
        if (this.readyState == 4) {
            if (this.status == 304) {
                alert(this.response);
                window.location = "login";

            }
            if (this.status == 305) {
                alert(this.response);
                window.location = "login";

            }
            if (this.status == 200) {
                alert(this.response);
                window.location = "Home";

            }

        };
        xhttp.open("POST", "/userLogin", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(myObj));


    }
}
