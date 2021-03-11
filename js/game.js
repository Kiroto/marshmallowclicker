let counter = 0;
let mps = 0;

class ShopItem {
    constructor(name, price, mps, pictureUrl) {
        this.name = name;
        this.price = price;
        this.mps = mps;
        this.pictureUrl = pictureUrl
    }
}

let shop = [
  {
    name: "Guarina",
    price: 35,
    mps: 0.2,
    pictureUrl: "https://cdn2.hubspot.net/hubfs/3857073/guari.png",
  },
  {
    name: "Kripikrin",
    price: 15,
    mps: 0.1,
    pictureUrl:
      "https://krispykremepr.com/wp-content/uploads/2018/01/Original-Glazed-Doughnut-0029.png",
  },
];

const addItemsToShop = () => {
    const shopArea = document.getElementById("shop")
    shop.forEach((item) => {
        const shopItemArea = document.createElement("div")
        const shopLabel = document.createElement("span")
        shopLabel.textContent = item.name
        const itemButton = document.createElement("button");
        const itemButtonImage = document.createElement("img");
        itemButtonImage.src = item.pictureUrl

        itemButton.appendChild(itemButtonImage);
        itemButton.onclick = () => {
            comprar(item)
        }
        shopItemArea.appendChild(itemButton);
        shopItemArea.appendChild(shopLabel)
        shopArea.appendChild(shopItemArea);
    })
}

let lastUpdated = Date.now()

const button = document.getElementById("marshmallow");
const counterLabel = document.getElementById("textoContador");
const mpsLabel = document.getElementById("mps");

const onButtonClick = () => {
    counter = counter + 1;
}

const onUpdate = () => {
    delta = (Date.now() - lastUpdated) / 1000;
    lastUpdated = Date.now()
    counter += mps * delta;
    counterLabel.textContent = counter.toFixed(0);
}

const onGuarinaClick = () => {
    comprar(0)
}

const comprar = (shopItem) => {
    precio = shopItem.price;
    if (precio > counter) {
        alert("Señor uste no tiene cualto")
    } else {
        counter -= precio;
        mps += shopItem.mps;
        mpsLabel.textContent = mps;
    }
}

window.onload = function () {
    addItemsToShop()
    setInterval(onUpdate, 5);
};

button.onclick = onButtonClick