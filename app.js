const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
    {
        id: 1,
        title: "Air Force",
        price: 119,
        colors: [
            { code: "darkblue", img: "./img/air.png" },
            { code: "blue", img: "./img/air2.png" },
        ],
    },
    {
        id: 2,
        title: "Air Jordan",
        price: 149,
        colors: [
            { code: "white", img: "./img/jordan.png" },
            { code: "black", img: "./img/jordan2.png" },
        ],
    },
    {
        id: 3,
        title: "Air Blazer",
        price: 150,
        colors: [
            { code: "black", img: "./img/blazer.png" },
            { code: "gray", img: "./img/blazer2.png" },
        ],
    },
    {
        id: 4,
        title: "Air Crater",
        price: 180,
        colors: [
            { code: "gray", img: "./img/crater.png" },
            { code: "blue", img: "./img/crater2.png" },
        ],
    },
    {
        id: 5,
        title: "Air Hippie",
        price: 200,
        colors: [
            { code: "blue", img: "./img/hippie.png" },  // make sure filename is lowercase!
            { code: "yellow", img: "./img/hippie2.png" },
        ],
    },
];

let choosenProduct = products[0];

const currentproductImg = document.querySelector(".productImg");
const currentproductTitle = document.querySelector(".productTitle");
const currentproductPrice = document.querySelector(".productPrice");
const currentproductColors = document.querySelectorAll(".color");
const currentproductSizes = document.querySelectorAll(".size");

// SLIDER CLICK
menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {

        // Slide effect
        wrapper.style.transform = `translateX(${-100 * index}vw)`;

        // Change product
        choosenProduct = products[index];

        // Update details
        currentproductTitle.textContent = choosenProduct.title;
        currentproductPrice.textContent = "$" + choosenProduct.price;
        currentproductImg.src = choosenProduct.colors[0].img;

        // Update colors
        currentproductColors.forEach((color, idx) => {
            color.style.backgroundColor = choosenProduct.colors[idx].code;
        });
    });
});

// CHANGE IMAGE ON COLOR CLICK
currentproductColors.forEach((color, index) => {
    color.addEventListener("click", () => {
        currentproductImg.src = choosenProduct.colors[index].img;
    });
});

// SIZE SELECTOR
currentproductSizes.forEach((size, index) => {
    size.addEventListener("click", () => {

        currentproductSizes.forEach((s) => {
            s.style.backgroundColor = "white";
            s.style.color = "black";
        });

        size.style.backgroundColor = "black";
        size.style.color = "white";
    });
});

// PAYMENT POP-UP
const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
    payment.style.display = "flex";
});

close.addEventListener("click", () => {
    payment.style.display = "none";
});
