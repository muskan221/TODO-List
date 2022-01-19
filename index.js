function getAndUpdate() {
    console.log("Updating List...");
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    if (localStorage.getItem('itemsJson') == null) {
        itemsJsonArray = [];
        itemsJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    }
    else {
        itemsJsonArrayStr = localStorage.getItem('itemsJson') // returns string
        itemsJsonArray = JSON.parse(itemsJsonArrayStr)
        itemsJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    }
    update();
}
function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemsJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    }
    else {
        itemsJsonArrayStr = localStorage.getItem('itemsJson') // returns string
        itemsJsonArray = JSON.parse(itemsJsonArrayStr)
    }
    // populate the table
    let tableBody = document.getElementById('tableBody')
    let str = ""
    itemsJsonArray.forEach((element, index) => {
        str += `
                <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-primary" id = "delete" onclick="deleted(${index})">Done ✔</button></td>
                </tr>`;
    });
    tableBody.innerHTML = str;

}
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();
function deleted(itemIndex) {
    console.log("Deleting", itemIndex);
    itemsJsonArrayStr = localStorage.getItem('itemsJson') // returns string
    itemsJsonArray = JSON.parse(itemsJsonArrayStr)
    // Deleting itemIndex element from the array
    itemsJsonArray.splice(itemIndex, 1)
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    update();
}
function clearStorage() {
    if (confirm("Do you really want to clear the list?")) {
        console.log("Clearing the storage");
        localStorage.clear();
        update();
    }
}
