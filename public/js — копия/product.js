// public/js/products.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('products-container');
  const params    = new URLSearchParams(window.location.search);
  const url       = '/api/products' + (params.toString() ? '?' + params : '');

  fetch(url)
    .then(r => r.json())
    .then(renderProducts)
    .catch(() => {
      container.innerHTML =
        '<div class="alert alert-danger">Қате: деректер жүктелмеді</div>';
    });

  /* ----------- ТАУАР КАРТОЧКАЛАРЫ ----------- */
  function renderProducts(list) {
    if (!list.length) {
      container.innerHTML = '<p>Тауар табылмады.</p>';
      return;
    }

    container.innerHTML = list.map(p => {
      /* жеңілдік бар ма? */
      const hasSale = p.old_price && p.old_price > p.price;

      return `
      <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="product-card h-100">
          <img src="images/${p.image_url}" class="w-100" alt="${p.name}">
          ${hasSale ? '<span class="badge badge-sale">Sale</span>' : ''}
          ${p.is_free_shipping ? '<span class="badge badge-new">Free</span>' : ''}

          <div class="product-info d-flex flex-column">
            <h6 class="product-title">${p.name}</h6>
            <p class="product-desc small flex-grow-1">
              ${p.description ?? ''}
            </p>

            <div class="price-wrap">
              <span class="new-price">${p.price.toLocaleString()} ₸</span>
              ${hasSale
                ? `<span class="old-price">${p.old_price.toLocaleString()} ₸</span>`
                : ''}
            </div>

            <button class="btn-cart mt-auto"
                    data-id="${p.id}"
                    data-name="${p.name}"
                    data-price="${p.price}">
              Себетке
            </button>
          </div>
        </div>
      </div>`;
    }).join('');

    /* батырмаларға тыңдағышты енді ғана қоса аламыз */
    container.querySelectorAll('.btn-cart')
             .forEach(btn => btn.addEventListener('click', onAddToCart));
  }

  /* ----------- СЕБЕТ ЛОГИКАСЫ ----------- */
  function onAddToCart(e) {
    const btn   = e.currentTarget;
    const item  = {
      id   : btn.dataset.id,
      name : btn.dataset.name,
      price: Number(btn.dataset.price),
      qty  : 1
    };

    let cart;
    try { cart = JSON.parse(localStorage.getItem('cart')) || []; }
    catch { cart = []; }

    const existing = cart.find(p => p.id === item.id);
    if (existing) existing.qty += 1;
    else          cart.push(item);

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
  }

  /* ----------- БЕЙДЖ САНАҒЫ ----------- */
  function updateCartCounter() {
    let cart;
    try { cart = JSON.parse(localStorage.getItem('cart')) || []; }
    catch { cart = []; }

    const total = cart.reduce((sum, p) => sum + (Number(p.qty) || 0), 0);
    const badge = document.querySelector('.cart-counter');
    if (!badge) return;

    badge.style.display = total ? 'flex' : 'none';
    badge.textContent   = total;
  }

  /* бет жүктелгенде бір рет санау */
  updateCartCounter();
});
