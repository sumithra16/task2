function insert() {
    var get_value = JSON.parse(localStorage.getItem('myObj'));
    console.log(get_value);

    let add = {
        Product_Name: document.getElementById("Product_Name").value,
        Product_Owner: get_value.username,
        Product_URL: document.getElementById("Product_URL").value,
        Product_Owner_ID: get_value.id

    }

    console.log(add);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        console.log(this.responseText);
        if (this.readyState == 4) {
            console.log(add);
            window.location = "Home_page";
        }

    };
    xhttp.open("POST", "/ProductDetails", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(add));


}




