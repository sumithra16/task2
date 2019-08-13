function deleteProduct(data) {
    console.log(data.parentNode.parentNode.childNodes[1].innerHTML);
    var delete_row = { id: data.parentNode.parentNode.childNodes[1].innerHTML }
    console.log(delete_row);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        console.log('response below');
        console.log(xhttp.response);
        if (this.readyState == 4) {

            alert(' Row will be Deleted');

            window.location = "Home_page";
        }
    };
    xhttp.open("POST", "/deleteProduct", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(delete_row));
}   