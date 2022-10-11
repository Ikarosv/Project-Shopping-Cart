require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testa se fetchItem é uma função.', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Testa se fetch foi chamado.', async () => {
    await fetchItem('MLB1615760527');
    expect(global.fetch).toHaveBeenCalled();
  });

  it('Testa se a função fetchItem utiliza o endpoint correto.', async () => {
    await fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527' 
    expect(global.fetch).toHaveBeenCalledWith(endpoint);
  });
});
