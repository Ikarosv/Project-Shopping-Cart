const getSavedCartItems = () => {
  const cartItemsLocalStorage = localStorage.getItem('cartItems');
  // if (cartItemsLocalStorage) {
  //     return JSON.parse(cartItemsLocalStorage);
  // }
  return cartItemsLocalStorage ? JSON.parse(cartItemsLocalStorage) : cartItemsLocalStorage;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
