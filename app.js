const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      { code: "darkblue", img: "air.png" },
      { code: "blue", img: "air2.png" },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      { code: "white", img: "jordan.png" },
      { code: "black", img: "jordan2.png" },
    ],
  },
  {
    id: 3,
    title: "Air Blazer",
    price: 150,
    colors: [
      { code: "black", img: "blazer.png" },
      { code: "gray", img: "blazer2.png" },
    ],
  },
  {
    id: 4,
    title: "Air Crater",
    price: 180,
    colors: [
      { code: "gray", img: "crater.png" },
      { code: "blue", img: "crater2.png" },
    ],
  },
  {
    id: 5,
    title: "Air Hippie",
    price: 200,
    colors: [
      { code: "blue", img: "hippie.png" },
      { code: "yellow", img: "hippie2.png" },
    ],
  },
];

let choosenProduct = products[0];

const currentproductImg = document.querySelector(".productImg");
const currentproductTitle = document.querySelector(".productTitle");
const currentproductPrice = document.querySelector(".productPrice");
const currentproductColors = document.querySelectorAll(".color");
const currentproductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    wrapper.style.transform = `translateX(${-100 * index}vw)`;
    choosenProduct = products[index];
    currentproductTitle.textContent = choosenProduct.title;
    currentproductPrice.textContent = "$" + choosenProduct.price;
    currentproductImg.src = choosenProduct.colors[0].img;

    currentproductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentproductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentproductImg.src = choosenProduct.colors[index].img;
  });
});

currentproductSizes.forEach((size) => {
  size.addEventListener("click", () => {
    currentproductSizes.forEach((s) => {
      s.style.backgroundColor = "white";
      s.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});
