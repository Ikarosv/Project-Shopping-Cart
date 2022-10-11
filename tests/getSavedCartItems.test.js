const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Testa se ao executar a função o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(global.localStorage.getItem).toHaveBeenCalled();
  });

  it('Teste se ao executar a função o método localStorage.getItem é chamado com um parametro', () => {
    getSavedCartItems()
    
  });
});
