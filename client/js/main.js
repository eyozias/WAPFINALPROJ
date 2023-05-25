
window.onload = getProducts;


async function getProducts() {
    const response = await fetch("http://localhost:3000/products");
    const jsonData = await response.json();

    for (let e of jsonData) {
        addNewProductRowToTable(e.id, e.title, e.description, e.price);
    }

}



function addNewProductRowToTable(id, title, description, price) {

    const row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.appendChild(document.createTextNode(id));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(title));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(description));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(price));
    row.appendChild(cell);

    document.getElementById('tbodyProductList').appendChild(row);

}


async function postProduct(title, description, price) {
    let b = { "title": title, "description": description, "price": price }
    let setting = {
        method: 'POST',
        body: JSON.stringify(b),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch("http://localhost:3000/products", setting);
    const jsonData = await response.json();
    return jsonData;
}


document.getElementById('btnRegister').addEventListener('click', (event) => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    data = postProduct(title, description, price);

    document.getElementById('title').innerHTML = data;
    document.getElementById('myform').reset();


});