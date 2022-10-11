require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Testa se fetch foi chamado ', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Testa se ao chamar a função fetchProducts com o argumento \'computador\' a função fetch utiliza o endpoint correto.', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Testa se a função fetchProducts com o argumento \'computador\' retorna o objeto correto.', async () => {
    const actual = await fetchProducts('computador');
    const expected = computadorSearch;
    expected(actual).toEqual(expected);
  });

  it('Testa se, sem argumento, a função fetchProducts retorna um erro', () => {
    expect(async () => {
      await fetchProducts();
    }).toThrow('You must provide an url');
  });
});
