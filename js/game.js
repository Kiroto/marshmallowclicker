let counter = 0;
let mps = 0;

const getCounter = () => {
    return counter.toFixed(0)
}

const getMps = () => {
    return mps.toFixed(1)
}

class ShopItem {
    constructor(name, price, mps, pictureUrl) {
        this.name = name;
        this.basePrice = price;
        this.timesBought = 0;
        this.mps = mps;
        this.pictureUrl = pictureUrl;

        this.baseNode = document.createElement("div");
        this.priceNode = document.createElement("span");
        this.updatePrice()
    }

    updatePrice = () => {
        this.priceNode.textContent = `$ ${this.getSalePrice().toFixed(0)}`
    }

    initializeBaseNode = () => {
        const itemButton = document.createElement("button");
        const itemButtonImage = document.createElement("img");
        itemButtonImage.src = this.pictureUrl;
        itemButton.appendChild(itemButtonImage);
        itemButton.onclick = this.buy
        this.baseNode.appendChild(itemButton)

        const shopLabel = document.createElement("span");
        shopLabel.textContent = this.name;
        this.baseNode.appendChild(shopLabel);
        this.baseNode.appendChild(this.priceNode);
    }

    buy = () => {
        const salePrice = this.getSalePrice()
        if (salePrice > counter) {
            alert("Señor uste no tiene cualto");
        } else {
            counter -= salePrice;
            this.timesBought += 1;
            this.updatePrice();
            mps += this.mps;
        }
    }

    getSalePrice = () => {
        return Math.floor(Math.pow(this.basePrice, (this.timesBought + 15)/15))
    }
}

let shop = [
  new ShopItem(
    "Guarina",
    15,
    0.2,
    "https://cdn2.hubspot.net/hubfs/3857073/guari.png"
  ),
  new ShopItem(
    "Kripikrin",
    100,
    1,
    "https://krispykremepr.com/wp-content/uploads/2018/01/Original-Glazed-Doughnut-0029.png"
  ),
];

const addItemsToShop = () => {
    const shopArea = document.getElementById("shop")
    shop.forEach((item) => {
        item.initializeBaseNode()
        shopArea.appendChild(item.baseNode);
    })
}

const button = document.getElementById("marshmallow");
const counterLabel = document.getElementById("textoContador");
const mpsLabel = document.getElementById("mps");

const onButtonClick = () => {
    counter = counter + 1;
}

let lastUpdated = Date.now();

const onUpdate = () => {
    delta = (Date.now() - lastUpdated) / 1000;
    lastUpdated = Date.now()
    counter += mps * delta;

    counterLabel.textContent = getCounter();
    mpsLabel.textContent = getMps();
}

const onLongUpdate = () => {
    document.title = `[${getCounter()}] Marshmallows!`;
}

window.onload = function () {
    button.onclick = onButtonClick;
    addItemsToShop()
    setInterval(onUpdate, 5);
    setInterval(onLongUpdate, 2000)
};