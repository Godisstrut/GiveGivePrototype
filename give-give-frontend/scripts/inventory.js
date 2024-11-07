const template = document.getElementById("toy-template"); 
const inventoryContainer = document.getElementById("inventory-container");
const profile = document.getElementById('profile');


//***Data fetch for Profile in inventory***

fetch('http://localhost:3000/api/profile?id=1')
    .then(Response => {
        if (!Response.ok) {
            throw new Error('Network response was not ok');
        }

        return Response.json();
    })

    .then(data => {
        console.log(data); 

        document.getElementById('name').textContent = `Name: ${data[0].child_name}`;
        document.getElementById('parent-name').textContent = `Parent name: ${data[0].parent_name}`;
        document.getElementById('toys-traded').textContent = `Toys traded: ${data[0].toys_traded}`;
        document.getElementById('toys-in-inventory').textContent = `Toys in inventory: ${data[0].items_in_inventory}`;
    })

    
    .catch(error =>{
        console.error('There was a problem with the fetch operation:', error);

    });




//***Datafetch for Inventory-list***
fetch('https://localhost:3000//api/getInventory')
    .then(response => {
        if (!response.ok) {
            throw new error('Network not workie')
        }

        return Response.json();
    })

    .then(data =>{
        console.log(data);

        const inventoryContainer = document.getElementById('inventory-container');
        const toyTemplate = document.getElementById('toy-template').content;


        
        //adds new toy to inventory - clones mall - Fill in the data - adds in elements
        data.forEach(toy => {
            const toyElement = document.importNode(toyTemplate, true);

            toyElement.querySelector(".toy-image").scr = toy.image || '/resources/img/default_img.jpg';
            toyElement.querySelector(".toy-title").textContent = toy.title;
            toyElement.querySelector(".toy-times-traded").textContent = `Times Traded: ${toy.timesTraded}`;

        
            inventoryContainer.appendChild(toyElement);

    });

})

.catch(error => {
    console.error('There was a problem with fetshy op for toy-data in inventory')


});






