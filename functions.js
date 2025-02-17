function addToCart(name) {
  if (!name) return;
  const findItem = productData.find((item) => item.name === name);
  const cartFind = cartData.find((item) => item.name === name);
  if (!cartFind) {
    cartData.push({ ...findItem, quantity: 1 });
  } else {
    cartFind.quantity += 1;
    cartData = cartData.map((item) => {
      if (item.name === name) {
        return { ...item, quantity: cartFind.quantity };
      }
      return item;
    });
  }
  populateData();
  window.localStorage.setItem("cart", JSON.stringify(cartData));
}

// Minus from cart

function minusToCart(name) {
  if (!name) return;
  const cartFind = cartData.find((item) => item.name === name);
  if (cartFind) {
    cartFind.quantity -= 1;
  }
  cartData = cartData.filter((item) => item.quantity > 0);
  populateData();
  window.localStorage.setItem("cart", JSON.stringify(cartData));
}

function removeFromCart(name) {
  if (!name) return;
  cartData = cartData.filter((item) => item.name !== name);
  populateData();
  window.localStorage.setItem("cart", JSON.stringify(cartData));
}
