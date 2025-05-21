/* ----------- ТАУАР КАРТОЧКАЛАРЫ ----------- */
function renderProducts(list) {
  if (!list.length) {
    container.innerHTML = '<p>Тауар табылмады.</p>';
    return;
  }

  container.innerHTML = list.map(p => {
    const hasSale = p.old_price && p.old_price > p.price;   // ← жеңілдік бар-жоғын анықтаймыз
    return `
      <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="product-card h-100">
          <img src="images/${p.image_url}" class="w-100" alt="${p.name}">
          ${hasSale ? '<span class="badge badge-sale">Sale</span>' : ''}
          ${p.is_free_shipping ? '<span class="badge badge-new">Free</span>' : ''}

          <div class="product-info d-flex flex-column">
            <h6 class="product-title">${p.name}</h6>
            <p class="product-desc flex-grow-1 small">${p.description ?? ''}</p>

            <div class="price-wrap">
              <span class="new-price">${p.price.toLocaleString()} ₸</span>
              ${hasSale ? `<span class="old-price">${p.old_price.toLocaleString()} ₸</span>` : ''}
            </div>

            <button class="btn-cart mt-auto"
                    data-id="${p.id}" data-name="${p.name}" 
                    data-price="${p.price}">
              Себетке
            </button>
          </div>
        </div>
      </div>`;
  }).join('');

  /* кейін батырмаға тыңдағыш */
  container.querySelectorAll('.btn-cart')
           .forEach(btn => btn.addEventListener('click', onAddToCart));
}
