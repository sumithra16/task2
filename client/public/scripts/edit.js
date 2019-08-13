function edit() {
    var local = JSON.parse(localStorage.getItem('get_ID'));
    var get_items = {
        id: local._id,
        Product_Name: document.getElementById("Product_Name").value,
        Product_URL: document.getElementById("Product_URL").value
    }
    console.log(get_items);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        console.log(xhttp.response);
        if (this.readyState == 4) {
            console.log(xhttp.response);
            if (this.status == 200) {
                window.location = "Home_page";
                alert('Updated successfully');
            }
        };
    }
    xhttp.open("POST", "/updateProduct", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(get_items));



}




function get_Values() {
    console.log('--------onload update button---------');
    var local = JSON.parse(localStorage.getItem("get_ID"));
    console.log(local);
    document.getElementById('Product_Name').value = local.Product_Name;
    document.getElementById('Product_URL').value = local.Product_URL;
}


function update_this(data) {
    console.log('-----update this----------')
    console.log(data.parentNode.parentNode.childNodes[1].innerHTML);
    var get_ID = { id: data.parentNode.parentNode.childNodes[1].innerHTML }
    console.log(get_ID);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        console.log(this.response);
        if (this.readyState == 4) {
            console.log(xhttp.responseText);
            if (this.status == 200) {

                localStorage.setItem('get_ID', (xhttp.responseText));

            }
        };
    }
    xhttp.open("POST", "/editProduct", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(get_ID));
    window.location = "edit";

}



