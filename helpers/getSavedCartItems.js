const getSavedCartItems = () => {
  const cartItemsLocalStorage = localStorage.getItem('cartItems');
  if (cartItemsLocalStorage) {
    return JSON.parse(cartItemsLocalStorage);
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
