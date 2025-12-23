const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  { title: "Air Force", price: 1199, colors: [{ code: "black", img: "air.png" }] },
  { title: "Air Jordan", price: 1499, colors: [{ code: "black", img: "jordan.png" }] },
  { title: "Air Blazer", price: 1500, colors: [{ code: "black", img: "blazer.png" }] },
  { title: "Air Crater", price: 1800, colors: [{ code: "black", img: "crater.png" }] },
  { title: "Air Hippie", price: 2000, colors: [{ code: "black", img: "hippie.png" }] }
];

let choosenProduct = products[0];

const productImg = document.querySelector(".productImg");
const productTitle = document.querySelector(".productTitle");
const productPrice = document.querySelector(".productPrice");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    wrapper.style.transform = `translateX(${-100 * index}vw)`;
    choosenProduct = products[index];
    productTitle.textContent = choosenProduct.title;
    productPrice.textContent = "₹" + choosenProduct.price;
    productImg.src = choosenProduct.colors[0].img;
  });
});
