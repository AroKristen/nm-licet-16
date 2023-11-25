function addItem() {
    var itemName = document.getElementById("itemName").value;
    var quantity = document.getElementById("quantity").value;
    var price = document.getElementById("price").value;

    if (itemName && quantity && price) {
        var tableBody = document.getElementById("stockTableBody");
        var newRow = tableBody.insertRow(tableBody.rows.length);

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);

        cell1.innerHTML = itemName;
        cell2.innerHTML = quantity;
        cell3.innerHTML = price;

        // Clear input fields
        document.getElementById("itemName").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("price").value = "";
    } else {
        alert("Please fill in all fields.");
    }
}
