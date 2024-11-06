const template = document.getElementById("toy-template"); 
const inventoryContainer = document.getElementById("inventory-container"); 


//lägger till leksak i inventory - klonar mallen - fyller i data - lägger till färdiga elementet
toys.forEach(toy => {
    const ToyElement = template.content.CloneNode(true);

    ToyElement.querySelector(".toy-image").scr = toy.imgSrc;
    ToyElement.querySelector(".toy-title").textContent = toy.title;
    ToyElement.querySelector(".toy-image").textContent = `Times Traded: ${toy.timesTraded}`;

    inventoryContainer.appendChild(toyElement);



});
