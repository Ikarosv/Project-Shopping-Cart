// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const sectionItems = document.querySelector('.items');
const olCartItems = document.querySelector('.cart__items');
const buttonEmptyCart = document.querySelector('.empty-cart');

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.productId = id;
  section.appendChild(button);

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

const returnTotalPrice = (cartProducts) => {
  let totalPrice = 0;
  cartProducts.forEach(({ productPrice }) => {
    totalPrice += productPrice;
  });
  return totalPrice;
};

const updateSpan = () => {
  const spanTotalPrice = document.querySelector('.total-price');
  const cartProducts = olCartItems.querySelectorAll('.cart__item');
  const totalPrice = returnTotalPrice(cartProducts);
  spanTotalPrice.innerText = `$${totalPrice}`;
};

const cartItemClickListener = (e) => {
  olCartItems.removeChild(e.target);
  const localStorageCartItems = getSavedCartItems();
  const idIndex = localStorageCartItems.indexOf(e.target.productId);
  localStorageCartItems.splice(idIndex, 1);
  saveCartItems(JSON.stringify(localStorageCartItems));
  updateSpan();
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const loadProducts = async (productId) => {
  const product = await fetchItem(productId);
  const productChild = createCartItemElement(product);
  productChild.productId = productId;
  productChild.productPrice = product.price;
  olCartItems.appendChild(productChild);
  updateSpan();
};

const buttonEvent = async (button) => {
  loadProducts(button.productId);
  if (localStorage.cartItems) {
    const cartItemsIds = getSavedCartItems();
    cartItemsIds.push(button.productId);
    saveCartItems(JSON.stringify(cartItemsIds));
    return;
  }
  saveCartItems(JSON.stringify([button.productId]));
};

const clearCart = () => {
  olCartItems.innerHTML = '';
  updateSpan();
  localStorage.removeItem('cartItems');
};
buttonEmptyCart.addEventListener('click', clearCart);

window.onload = async () => {
  // CARREGA PRODUTOS
  const response = await fetchProducts('computador');
  const { results } = response;
  results.forEach((product) => {
    sectionItems.appendChild(createProductItemElement(product));
  });
  // EVENTOS DO CARRINHO
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', () => buttonEvent(button));
  });
  // PEGAR DO LOCALSTORAGE
  if (localStorage.cartItems) {
    const productsIds = getSavedCartItems();
    productsIds.forEach(loadProducts);
  }
};
