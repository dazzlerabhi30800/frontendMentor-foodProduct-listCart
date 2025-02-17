const productData = [
  {
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      mobile: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      mobile: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      mobile: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      mobile: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      mobile: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];
let cartData = JSON.parse(localStorage.getItem("cart")) || [];

const productWrapper = document.querySelector(".product--wrapper");
const cart = document.querySelector(".cart");
const totalPrice = document.querySelector(".totalPrice");
const confirmOrderBtn = document.querySelector(".confirm--order--btn");

function populateProductWrapper() {
  productWrapper.innerHTML = productData
    .map((data) => {
      let { name, image, category, price } = data;
      let searchItem = cartData.find((item) => item.name === name);
      return `
            <div class="product--comp">
            <div class="product--img--container">
                <img class="product--img" src=${image.mobile} srcset="${
        image.tablet
      } 600w, ${image.desktop} 900w" alt=${name} />
                <div class="product--controls">

                 <div class='cart--controls bg-rose-600 ${
                   searchItem ? "show" : "hide"
                 } '><button onclick="minusToCart('${name}')" class='minus--cart'><i class='fa-solid fa-minus'></i></button><span>${
        searchItem ? searchItem.quantity : 0
      }</span><button onclick="addToCart('${name}')" class='add--cart'><i class='fa-solid fa-plus'></i></button></div>
                  <button  class="cart--btn ${
                    searchItem ? "hide" : "show"
                  }" onclick="addToCart('${name}')"><i class='fa-solid fa-cart-shopping'></i> Add To Cart</button>
                  </div>
                  </div>
                  <p class="product--category">${category}</p>
                  <h3 class="product--name">${name}</h3>
                  <h4 class="product--price">$${price}</h4>
                  </div>
                  `;
    })
    .join("");
}

function populateCart() {
  const cartWrapper = cart.querySelector(".cart--wrapper");
  const cartHeading = cart.querySelector(".cart--heading");

  if (cartData.length < 1) {
    cartHeading.innerText = `Your Cart (0)`;
    cartWrapper.innerHTML = `
    <div class="w-full flex flex-col gap-10">
      <img class="w-full h-40" src="./assets/images/illustration-empty-cart.svg" alt="empty cart" />
      <small class="mt-12 self-center w-full text-rose-800 font-medium text-center text-base">Your added items will appear here</small>
    </div>
    `;
    return;
  }

  cartHeading.innerText = `Cart Total (${cartData.length})`;
  cartWrapper.innerHTML = cartData
    .map((item) => {
      let price = parseInt(item.price).toFixed(2);
      let totalPrice = (parseInt(item.price) * parseInt(item.quantity)).toFixed(
        2
      );
      return `
      <div class="cart--comp w-full flex justify-between items-center">
        <div class="flex flex-col gap-3">
          <h3>${item.name}</h3>
          <div class="flex items-center gap-10">
            <span class="cart--quantity text-red-600">${item.quantity}x</span>
            <p class="flex items-center gap-4 text-gray-500">
              <span>@${price}</span>
              <span class="font-bold">$${totalPrice}</span>
            </p>
          </div>
        </div>
        <button onclick="removeFromCart('${item.name}')" class="cursor-pointer text-black hover:text-gray-400 text-xl"><i class="fa-solid fa-times"></i></button>
      </div>
      `;
    })
    .join("");
}

const confirmOrderContainer = document.querySelector(
  ".confirm--order--container"
);

function populateOrderConfirmWrapper() {
  const price = cartData.map((data) => {
    return parseInt(data.quantity * data.price);
  });

  const reduceArr = price.reduce((acc, item) => {
    return parseInt(acc + item);
  }, 0);
  const totalOrder = `<div class="text-gray-800 py-2 px-4 flex justify-between items-center">
    <p>Order Total</p>
    <h4 class="font-bold text-xl">$${reduceArr}.00</h4>
   </div>`;
  confirmOrderContainer.innerHTML =
    cartData
      .map((data) => {
        const {
          name,
          quantity,
          price,
          image: { thumbnail },
        } = data;
        let totalPrice = parseInt(price * quantity).toFixed(2);
        return `
      <div class="flex justify-between py-1 px-4 border-b border-gray-200">
        <div class="flex items-center gap-5">
          <img src=${thumbnail} alt=${name} class="w-10 h-10 rounded-md" />
          <div class="flex flex-col gap-1">
            <h5 class="font-bold text-gray-800">${name}</h5>
            <p class="flex items-center gap-5 text-gray-500 text-sm">
            <span class="text-red-600 text-xsm">${quantity}x</span>
            <span>
              @ $${price}
            </span>
            <p>
          </div>
        </div>
        <p class="text-black">$${totalPrice}</p>
      </div>
      `;
      })
      .join("") + totalOrder;
}

function populateData() {
  populateProductWrapper();
  populateCart();
  cartTotalAmount();
  populateOrderConfirmWrapper();
}

populateData();

// Add to Cart

function cartTotalAmount() {
  const totalPriceText = totalPrice.querySelector("h4");
  if (cartData.length < 1) {
    totalPrice.classList.replace("flex", "hidden");
    confirmOrderBtn.classList.replace("block", "hidden");
    return;
  }
  confirmOrderBtn.classList.replace("hidden", "block");
  // update the total price
  totalPrice.classList.replace("hidden", "flex");
  const price = cartData.map((data) => {
    return parseInt(data.quantity * data.price);
  });

  const reduceArr = price.reduce((acc, item) => {
    return parseInt(acc + item);
  }, 0);
  totalPriceText.innerText = `$${reduceArr}.00`;
}

const confirmOrderWrapper = document.querySelector("#confirm--order--wrapper");
const startNewOrderBtn = document.querySelector("#startNew--order--btn");
let confirmOrder = false;

function showOrderConfirm() {
  if (confirmOrder) {
    confirmOrderWrapper.classList.replace("hideDialog", "showDialog");
  } else {
    confirmOrderWrapper.classList.replace("showDialog", "hideDialog");
  }
}

confirmOrderBtn.addEventListener("click", () => {
  confirmOrder = !confirmOrder;
  showOrderConfirm();
});

startNewOrderBtn.addEventListener("click", () => {
  confirmOrder = false;
  showOrderConfirm();
});
