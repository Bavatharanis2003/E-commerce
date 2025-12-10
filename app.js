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
    // change slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    // change chosen product
    choosenProduct = products[index];

    // update UI
    if (currentproductTitle) currentproductTitle.textContent = choosenProduct.title;
    if (currentproductPrice) currentproductPrice.textContent = "$" + choosenProduct.price;
    if (currentproductImg) currentproductImg.src = choosenProduct.colors[0].img;

    currentproductColors.forEach((colorEl, i) => {
      if (choosenProduct.colors[i]) colorEl.style.backgroundColor = choosenProduct.colors[i].code;
    });
  });
});

// color click -> change product image
currentproductColors.forEach((colorEl, idx) => {
  colorEl.addEventListener("click", () => {
    if (choosenProduct.colors[idx]) currentproductImg.src = choosenProduct.colors[idx].img;
  });
});

// size selection
currentproductSizes.forEach((sizeEl) => {
  sizeEl.addEventListener("click", () => {
    currentproductSizes.forEach((s) => {
      s.style.backgroundColor = "white";
      s.style.color = "black";
    });
    sizeEl.style.backgroundColor = "black";
    sizeEl.style.color = "white";
  });
});

// payment popup
const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const closeBtn = document.querySelector(".close");

if (productButton && payment) {
  productButton.addEventListener("click", () => {
    payment.style.display = "flex";
  });
}
if (closeBtn && payment) {
  closeBtn.addEventListener("click", () => {
    payment.style.display = "none";
  });
}
