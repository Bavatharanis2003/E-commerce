const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products =[
    {
        id:1,
        title:"Air Force",
        price:119,
        colors: [
            {
                code:"darkblue",
                img: "./img/air.png",
            },
            {
                code:"blue",
                img:"./img/air2.png",
            },
        ],
    },
    {
        id:2,
        title:"Air Jordan",
        price:149,
        colors:[
            {
                code:"white",
                img:"./img/jordan.png",
            },
            {
                code:"black",
                img:"./img/jordan2.png",
             },
             ],
        },
        {
         id:3,
         title:"Air Blazer",
         price:150, 
         colors:[
            {
                code:"black",
                img:"./img/blazer.png",
            },
            {  
                code:"gray with wite",
                img:"./img/blazer2.png",
             },
         ],
        },
        {
            id:4,
            title:"Air crater",
            price:180,
            colors:[
                {
                    code:"gray",
                    img:"./img/crater.png",
                },
                {
                    code:"blue",
                    img:"./img/crater2.png",
                },
            ],
        },
        {
            id:5,
            title:"Air Hippie",
            price:200,
            colors:[
                {
                    code:"blue",
                    img:"./img/Hippie.png",
                },
                {
                    code:"neon yellow",
                    img:"./img/hippie2.png",
                },
            ],
        },
];

let choosenProduct = products[0]

const currentproductImg = document.querySelector(".productImg");
const currentproductTitle = document.querySelector(".productTitle");
const currentproductPrice = document.querySelector(".productPrice");
const currentproductColors = document.querySelectorAll(".color");
const currentproductSizes = document.querySelectorAll(".size")

menuItems.forEach((item,index) => {
    item.addEventListenner("click",() => {
        //change the current slide
        wrapper.style.transform = 'translateX(${-100 * index}vw)';

        //change the choosen product
        choosenProduct = products[index]

        //change texts of currentproduct
        currentproductTitle.textContent = choosenProduct.title;
        currentproductPrice.textContent = "$" + choosenProduct.price;
        currentproductImg.src = choosenProduct.colors[0].img

        currentproductColors.forEach((colors,index)=>{
            colors.style.backgroundColor = choosenProduct.colors[index].code;
         });
    });
});


currentproductColors.forEach((colors,index) => {
    colors.addEventListener("click",() => {
        currentproductImg.src = choosenProduct.colors[index].img;
    });
});

currentproductSizes.forEach((size,index) => {
    size.addEventListener("click", () => {
        currentproductSizes.forEach((size) => {
            size.style.backgroundColor="white";
            size.style.colors="black";
        });
        size.style.backgroundColor="black"
        size.style.colors="white"
    });
});  

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListenner("click",() =>{
    payment.style.display = "flex";
});

close.addEventListener("click", () => {
    payment.style.display = "none";
});
