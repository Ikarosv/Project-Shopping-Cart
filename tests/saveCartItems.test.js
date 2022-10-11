const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Testa se ao executar a função o localStorage.setItem é chamado.', () => {
    saveCartItems('cartItem');
    expect(global.localStorage.setItem).toHaveBeenCalled();
  });

  it('Testa se ao executar a função o localStorage.setItem é chamado com dois parâmetros.', () => {
    saveCartItems('cartItem');
    expect(global.localStorage.setItem).toHaveBeenCalledWith('cartItems', 'cartItem');
  });
});
