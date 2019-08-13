function table() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        console.log(this.readyState);
        if (this.readyState == 4) {
            console.log(JSON.parse(this.responseText));
            let product = JSON.parse(this.responseText);
            var tableData = '';
            for (i = 0; i < product.length; i++) {

                tableData = tableData + `
                <tr >
                    <td>${product[i]["_id"]}</td>
                    <td>${product[i]["Product_Name"]}</td>
                    <td>${product[i]["Product_Owner"]}</td>
                    <td>${product[i]["Product_Owner_ID"]}</td>
                    <td>${product[i]["Product_URL"]}</td>
                    <td><a id="id" href="#" onclick="update_this(this)" class="btn btn-primary a-btn-slide-text">
                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                    <span><strong>Edit</strong></span>            
                </a></td>
                    <td ><a href="#" onclick="deleteProduct(this)"  class="btn btn-primary a-btn-slide-text">
                    <span class="glyphicon glyphicon-delete" aria-hidden="true"></span>
                    <span ><strong>Delete</strong></span>            
                </a></td>
                </tr>
               
                `;
            }
            console.log(tableData);
            var div = document.getElementById('tablebody');

            div.innerHTML += tableData;
            console.log(document.getElementById("tablebody"));

        }
    }
    var storageUsers = JSON.parse(localStorage.getItem('myObj'));
    xhttp.open("get", "/Home/" + storageUsers.id, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}




