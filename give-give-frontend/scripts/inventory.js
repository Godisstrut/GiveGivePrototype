const template = document.getElementById("toy-template"); 
const inventoryContainer = document.getElementById("inventory-container");
const profile = document.getElementById('profile');


//***Profile***

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




//***Inventory***
fetch('https://localhost:3000//api/getInventory')
    .then(response => {
        if (!response.ok) {
            throw new error('Network not workie')
        }

        return Response.json();
    })

    .then(data =>{
        console.log(data);

    })

    .catch(error =>{
        console.error('There was a problem fetchyfetchy op', error);
    });
    



//lägger till leksak i inventory - klonar mallen - fyller i data - lägger till färdiga elementet
toys.forEach(toy => {
    const ToyElement = template.content.CloneNode(true);

    ToyElement.querySelector(".toy-image").scr = toy.imgSrc;
    ToyElement.querySelector(".toy-title").textContent = toy.title;
    ToyElement.querySelector(".toy-image").textContent = `Times Traded: ${toy.timesTraded}`;

    inventoryContainer.appendChild(ToyElement);



});
