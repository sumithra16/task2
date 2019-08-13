function Home_page() {

    let myObjL = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        console.log(this.readyState, this.response, this.status);
        if (this.readyState == 4) {
            if (this.status == 301) {

                window.location = "login";
                alert(this.response);

            }
            if (this.status == 401) {
                alert(this.response);

                window.location = "login";


            }
            if (this.status == 200) {
                alert(this.response);
                var arr = [];
                if (JSON.parse(localStorage.getItem('myObjL'))) {
                    //  var storageUsers = JSON.parse(localStorage.getItem('myObjL'));
                    arr = JSON.parse(localStorage.getItem('myObjL'));
                    arr.push(myObjL);
                } else {
                    arr.push(myObjL);
                }
                localStorage.setItem('myObjL', JSON.stringify(arr));
                window.location = "Home_page";

            }

        };
    }

    xhttp.open("POST", "/userLogin", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(myObjL));
}