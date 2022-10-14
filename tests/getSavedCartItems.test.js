const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Testa se ao executar a função o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  
  it('Teste se ao executar a função o método localStorage.getItem é chamado com um parametro', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
  
  // it('Testa se retorna o esperado', () => {

  //   // localStorageSimulator('setItem');
  //   JSON.parse = jest.fn().mockImplementationOnce(() => {
  //     // return your what your code is returning.
  //   });
  //   getSavedCartItems();
  //   expect(JSON.parse).toHaveBeenCalled();
  // });
});
