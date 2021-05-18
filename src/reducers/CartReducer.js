export default function cartReducer(cart, action){
  const {id, sku, quantity} = action;
  switch(action.type){
    case "empty":
      return [];
    case "add":
      return addToCart(cart, id, sku);
    case "updateQuantity":
      return updateQuantity(cart, sku, quantity);
    default:
      throw new Error("Unhandled action " + action.type);

  }
}

function addToCart(cart, id, sku) {
  const isItemInCart = cart.find((item) => item.sku === sku);

    if (isItemInCart) {
      return cart.map((item) =>
        item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      return [...cart, { id, sku, quantity: 1 }];
    }
}

function updateQuantity(cart, sku, quantity) {
  if (quantity > 0) {
    return cart.map((item) =>
      item.sku === sku ? { ...item, quantity } : item
    );
  } else {
    return cart.filter((item) => item.sku !== sku);
  }
}

export function saveCartToStorage(cart) {
  try {
    const json = JSON.stringify(cart);
    localStorage.setItem("cart", json);
  } catch (error) {
    console.log("error in saving cart to localStorage");
  }
}

export function loadCartFromStorage(){
  try {
    return JSON.parse(localStorage.getItem("cart")) ?? [];
    // return data || [];
  } catch (error) {
    console.log("ERROR: cart could not be parsed. Reseting data for cart");
    return [];
  }
}
