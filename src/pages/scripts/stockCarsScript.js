import { gsap } from "gsap";
import AOS from "aos";
import { fetchPublicCars } from "../../lib/carsApi";

export function initStockCarsPage() {
  const timers = [];

  let cars = [];
  let visibleCount = 6;
  let wishlist = JSON.parse(localStorage.getItem('bba_wishlist') || '[]');
  let compareList = JSON.parse(localStorage.getItem('bba_compare') || '[]');
  let recentlyViewed = JSON.parse(localStorage.getItem('bba_recent') || '[]');
  let filteredCars = [...cars];

  function renderCars() {
    const grid = document.getElementById('carsGrid');
    if (!grid) return;
    const show = filteredCars.slice(0, visibleCount);
    grid.innerHTML = '';
    if (show.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--gray)">
        <i class="fas fa-car" style="font-size:3rem;color:var(--dark3);margin-bottom:16px;display:block"></i>
        No cars match your filters. Try adjusting your search.
      </div>`;
      const btn = document.getElementById('loadMoreBtn');
      if (btn) btn.style.display = 'none';
      return;
    }
    show.forEach((car, i) => {
      const inWish = wishlist.includes(car.id);
      const badgeHtml = car.badge ? `<div class="car-badge ${car.badge==='New'?'new':car.badge==='Hot'?'hot':''}">${car.badge}</div>` : '';
      const card = document.createElement('div');
      card.className = 'car-card';
      card.setAttribute('data-aos', i%3===0?'fade-up':i%3===1?'fade-left':'fade-right');
      card.setAttribute('data-aos-delay', (i%3)*80+'');
      card.innerHTML = `
        <div class="car-img-wrap">
          ${badgeHtml}
          <img src="${car.imgs[0]}" alt="${car.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'"/>
          <div class="car-wishlist ${inWish?'active':''}" onclick="toggleWishlist(event,${car.id})" title="Wishlist">
            <i class="fa${inWish?'s':'r'} fa-heart"></i>
          </div>
        </div>
        <div class="car-body">
          <div class="car-brand">${car.brand}</div>
          <div class="car-name">${car.name}</div>
          <div class="car-specs">
            <div class="spec-pill"><i class="fas fa-calendar"></i> ${car.year}</div>
            <div class="spec-pill"><i class="fas fa-tachometer-alt"></i> ${car.mileage.toLocaleString()} km</div>
            <div class="spec-pill"><i class="fas fa-gas-pump"></i> ${car.fuel}</div>
            <div class="spec-pill"><i class="fas fa-cogs"></i> ${car.trans}</div>
          </div>
          <div class="car-footer">
            <div class="car-price">$${car.price.toLocaleString()}</div>
            <div class="car-actions">
              <button class="btn-card btn-card-outline" onclick="addCompare(event,${car.id})" title="Compare">
                <i class="fas fa-balance-scale"></i>
              </button>
              <button class="btn-card btn-card-primary" onclick="openCarModal(${car.id})">View</button>
            </div>
          </div>
        </div>`;
      grid.appendChild(card);
    });
    AOS.refresh();
    const btn = document.getElementById('loadMoreBtn');
    if (btn) btn.style.display = visibleCount >= filteredCars.length ? 'none' : 'inline-flex';
  }

  function loadMore() {
    visibleCount += 3;
    renderCars();
  }

  function applyFilters() {
    const search = (document.getElementById('fSearch')?.value || '').trim().toLowerCase();
    const brand = document.getElementById('fBrand').value;
    const price = document.getElementById('fPrice').value;
    const fuel = document.getElementById('fFuel').value;
    const trans = document.getElementById('fTrans').value;
    const body = document.getElementById('fBody').value;
    const maxMiles = parseFloat(document.getElementById('fMileage').value) || Infinity;

    filteredCars = cars.filter(c => {
      if(search && !`${c.brand} ${c.name}`.toLowerCase().includes(search)) return false;
      if(brand && c.brand !== brand) return false;
      if(fuel && c.fuel !== fuel) return false;
      if(trans && c.trans !== trans) return false;
      if(body && c.body !== body) return false;
      if(c.mileage > maxMiles) return false;
      if(price) {
        if(price==='0-5000' && c.price>=5000) return false;
        if(price==='5000-15000' && (c.price<5000||c.price>=15000)) return false;
        if(price==='15000-30000' && (c.price<15000||c.price>=30000)) return false;
        if(price==='30000-60000' && (c.price<30000||c.price>=60000)) return false;
        if(price==='60000+' && c.price<60000) return false;
      }
      return true;
    });
    visibleCount = 6;
    renderCars();
    window.showToast(`Found ${filteredCars.length} vehicle${filteredCars.length!==1?'s':''}`, 'info');
  }

  function openCarModal(id) {
    const car = cars.find(c => c.id === id);
    if(!car) return;
    document.getElementById('modalCarName').textContent = car.name;
    document.getElementById('modalBody').innerHTML = `
      <div class="modal-car-gallery">
        <div class="gallery-main"><img id="galleryMain" src="${car.imgs[0]}" alt="${car.name}"/></div>
        <div class="gallery-thumbs">
          ${car.imgs.map((img,i)=>`<div class="gallery-thumb"><img src="${img}" onclick="document.getElementById('galleryMain').src='${img}'" alt="View ${i+1}"/></div>`).join('')}
        </div>
      </div>
      <div class="modal-car-info">
        <div><div class="info-label">Brand</div><div class="info-value">${car.brand}</div></div>
        <div><div class="info-label">Year</div><div class="info-value">${car.year}</div></div>
        <div><div class="info-label">Mileage</div><div class="info-value">${car.mileage.toLocaleString()} km</div></div>
        <div><div class="info-label">Color</div><div class="info-value">${car.color}</div></div>
      </div>
      <div class="modal-specs-grid">
        <div class="modal-spec"><i class="fas fa-engine"></i><div class="modal-spec-label">Engine</div><div class="modal-spec-value">${car.engine}</div></div>
        <div class="modal-spec"><i class="fas fa-horse"></i><div class="modal-spec-label">Power</div><div class="modal-spec-value">${car.hp} HP</div></div>
        <div class="modal-spec"><i class="fas fa-gas-pump"></i><div class="modal-spec-label">Fuel</div><div class="modal-spec-value">${car.fuel}</div></div>
        <div class="modal-spec"><i class="fas fa-cogs"></i><div class="modal-spec-label">Transmission</div><div class="modal-spec-value">${car.trans}</div></div>
        <div class="modal-spec"><i class="fas fa-car-side"></i><div class="modal-spec-label">Body</div><div class="modal-spec-value">${car.body}</div></div>
        <div class="modal-spec"><i class="fas fa-globe"></i><div class="modal-spec-label">Origin</div><div class="modal-spec-value">Japan</div></div>
      </div>
      <p style="color:var(--gray);font-size:.9rem;line-height:1.8;margin-bottom:20px">${car.desc}</p>
      <div class="modal-price-row">
        <div>
          <div style="font-size:.72rem;color:var(--gray);letter-spacing:2px;text-transform:uppercase;margin-bottom:4px">Export Price (FOB Japan)</div>
          <div class="modal-price">$${car.price.toLocaleString()}</div>
          <div style="font-size:.75rem;color:var(--gray);margin-top:4px">+ Shipping & Customs (varies by country)</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:.75rem;color:var(--gray)">Stock Status</div>
          <div style="color:#2ecc71;font-weight:700;margin-top:4px"><i class="fas fa-circle" style="font-size:.5rem;margin-right:4px"></i>Available</div>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn-modal btn-buy" onclick="openPayModal(${car.id})"><i class="fas fa-shopping-cart"></i> Buy Now</button>
        <button class="btn-modal btn-nego" onclick="openNego(${car.id})"><i class="fas fa-comments-dollar"></i> Negotiate</button>
        <a class="btn-modal btn-whatsapp" href="https://wa.me/81?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(car.name)}%2C%20please%20share%20details" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
        <button class="btn-modal btn-compare" onclick="addCompare(null,${car.id})"><i class="fas fa-balance-scale"></i> Compare</button>
      </div>`;
    window.openModal('carModal');
    addToRecent(car.id);
  }

  function toggleWishlist(e, id) {
    e.stopPropagation();
    const idx = wishlist.indexOf(id);
    if(idx === -1) { wishlist.push(id); window.showToast('Added to wishlist ❤️', 'success'); }
    else { wishlist.splice(idx,1); window.showToast('Removed from wishlist', 'info'); }
    localStorage.setItem('bba_wishlist', JSON.stringify(wishlist));
    renderCars();
  }

  function addCompare(e, id) {
    if(e) e.stopPropagation();
    if(compareList.includes(id)) { window.showToast('Already in compare', 'info'); return; }
    if(compareList.length >= 3) { window.showToast('Max 3 cars to compare', 'info'); return; }
    compareList.push(id);
    localStorage.setItem('bba_compare', JSON.stringify(compareList));
    updateCompareBar();
    window.showToast('Added to compare ⚖️', 'success');
  }
  function clearCompare() {
    compareList = [];
    localStorage.setItem('bba_compare', JSON.stringify(compareList));
    updateCompareBar();
  }
  function updateCompareBar() {
    const bar = document.getElementById('compareBar');
    const itemsDiv = document.getElementById('compareItemsBar');
    if (!bar || !itemsDiv) return;
    if(compareList.length === 0) { bar.classList.remove('show'); return; }
    bar.classList.add('show');
    itemsDiv.innerHTML = compareList.map(id => {
      const c = cars.find(x=>x.id===id);
      return c ? `<div class="compare-chip">${c.brand} ${c.name.split(' ').slice(0,2).join(' ')}<span class="compare-chip-remove" onclick="removeCompare(${id})">×</span></div>` : '';
    }).join('');
  }
  function removeCompare(id) {
    compareList = compareList.filter(x=>x!==id);
    localStorage.setItem('bba_compare', JSON.stringify(compareList));
    updateCompareBar();
  }
  function doCompare() {
    if(compareList.length < 2) { window.showToast('Select at least 2 cars to compare', 'info'); return; }
    const carsToCompare = compareList.map(id => cars.find(c=>c.id===id)).filter(Boolean);
    const fields = ['year','price','mileage','fuel','trans','body','engine','hp'];
    const labels = {year:'Year',price:'Price',mileage:'Mileage (km)',fuel:'Fuel',trans:'Transmission',body:'Body',engine:'Engine',hp:'Horsepower'};
    let html = `<div style="display:grid;grid-template-columns:120px ${carsToCompare.map(()=>'1fr').join(' ')};gap:0">
      <div></div>${carsToCompare.map(c=>`<div style="text-align:center;padding:12px 8px;background:rgba(201,168,76,0.06);border:1px solid var(--glass-border);border-radius:10px;margin:0 4px">
        <img src="${c.imgs[0]}" style="width:100%;height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px"/>
        <div style="font-weight:700;font-size:.88rem">${c.brand}</div>
        <div style="font-size:.78rem;color:var(--gray)">${c.name}</div>
      </div>`).join('')}
      ${fields.map(f=>`
        <div style="padding:10px 8px;font-size:.78rem;color:var(--gray);display:flex;align-items:center;border-bottom:1px solid rgba(255,255,255,0.04)">${labels[f]}</div>
        ${carsToCompare.map(c=>`<div style="padding:10px 8px;text-align:center;font-weight:600;font-size:.85rem;border-bottom:1px solid rgba(255,255,255,0.04);${f==='price'?'color:var(--gold);font-family:Orbitron':''}">
          ${f==='price'?'$'+c[f].toLocaleString():f==='mileage'?c[f].toLocaleString()+'km':f==='hp'?c[f]+' HP':c[f]}
        </div>`).join('')}`).join('')}
    </div>`;
    document.getElementById('compareBody').innerHTML = html;
    window.openModal('compareModal');
  }

  function addToRecent(id) {
    recentlyViewed = recentlyViewed.filter(x=>x!==id);
    recentlyViewed.unshift(id);
    recentlyViewed = recentlyViewed.slice(0,6);
    localStorage.setItem('bba_recent', JSON.stringify(recentlyViewed));
    updateRecentlyViewed();
  }
  function updateRecentlyViewed() {
    const section = document.getElementById('recently');
    const row = document.getElementById('recentRow');
    if (!section || !row) return;
    if(recentlyViewed.length === 0) { section.style.display='none'; return; }
    section.style.display = 'block';
    row.innerHTML = recentlyViewed.map(id => {
      const c = cars.find(x=>x.id===id);
      return c ? `<div class="recent-mini" onclick="openCarModal(${c.id})">
        <img src="${c.imgs[0]}" alt="${c.name}" onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400'"/>
        <div class="recent-mini-body">
          <div class="recent-mini-name">${c.brand} ${c.name.split(' ').slice(0,2).join(' ')}</div>
          <div class="recent-mini-price">$${c.price.toLocaleString()}</div>
        </div>
      </div>` : '';
    }).join('');
  }
  function clearRecent() {
    recentlyViewed = [];
    localStorage.setItem('bba_recent', JSON.stringify([]));
    const section = document.getElementById('recently');
    if (section) section.style.display='none';
  }

  function openNego(id) {
    const car = cars.find(c=>c.id===id);
    if(!car) return;
    document.getElementById('negoCarDisplay').value = `${car.brand} ${car.name}`;
    document.getElementById('negoListedPrice').value = `$${car.price.toLocaleString()} USD`;
    document.getElementById('negoCarName').value = car.name;
    window.closeModal('carModal');
    window.openModal('negoModal');
  }
  function submitNego() {
    const carName = document.getElementById('negoCarName').value;
    const price = document.getElementById('negoPrice').value;
    const name = document.getElementById('negoName').value;
    const email = document.getElementById('negoEmail').value;
    const msg = document.getElementById('negoMsg').value;
    if(!price || !name || !email) { window.showToast('Please fill all required fields', 'info'); return; }
    const subject = `Price Negotiation – ${carName}`;
    const body = `Car: ${carName}\nOffered Price: $${price}\nFrom: ${name}\nEmail: ${email}\nMessage: ${msg}`;
    window.location.href = `mailto:sales@bestbuyauto.jp?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.closeModal('negoModal');
    window.showToast('Offer submitted! We\'ll respond within 24 hours. 🤝', 'success');
  }

  function openPayModal(id) {
    const car = cars.find(c=>c.id===id);
    if(!car) return;
    document.getElementById('payCarName').textContent = `${car.brand} ${car.name}`;
    document.getElementById('payCarPrice').textContent = `$${car.price.toLocaleString()} USD`;
    window.closeModal('carModal');
    window.openModal('payModal');
  }
  function submitPayment() {
    window.closeModal('payModal');
    window.showToast('🎉 Request received! Our team will contact you shortly.', 'success');
  }

  function showGridLoading() {
    const grid = document.getElementById('carsGrid');
    if (!grid) return;
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--gray)">
      <i class="fas fa-circle-notch fa-spin" style="font-size:2.4rem;color:var(--gold);margin-bottom:16px;display:block"></i>
      Loading stock cars…
    </div>`;
  }

  function showGridError() {
    const grid = document.getElementById('carsGrid');
    if (!grid) return;
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--gray)">
      <i class="fas fa-triangle-exclamation" style="font-size:2.4rem;color:#e74c3c;margin-bottom:16px;display:block"></i>
      Couldn't load stock cars right now. Please refresh the page.
    </div>`;
  }

  async function loadCarsFromSupabase() {
    showGridLoading();
    try {
      const rows = await fetchPublicCars();
      cars = rows.map((row) => ({
        id: row.id,
        brand: row.brand,
        name: row.name,
        year: row.year,
        price: Number(row.price),
        mileage: Number(row.mileage),
        fuel: row.fuel,
        trans: row.trans,
        body: row.body,
        color: row.color,
        engine: row.engine,
        hp: row.hp,
        badge: row.badge,
        imgs: row.images && row.images.length ? row.images : ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'],
        desc: row.description,
      }));

      const params = new URLSearchParams(window.location.search);
      const bodyParam = params.get('body');
      const qParam = params.get('q');
      const fuelParam = params.get('fuel');
      if (bodyParam) {
        const bodySelect = document.getElementById('fBody');
        if (bodySelect && [...bodySelect.options].some(o => o.value === bodyParam)) {
          bodySelect.value = bodyParam;
        }
      }
      if (fuelParam) {
        const fuelSelect = document.getElementById('fFuel');
        if (fuelSelect && [...fuelSelect.options].some(o => o.value === fuelParam)) {
          fuelSelect.value = fuelParam;
        }
      }
      if (qParam) {
        const searchInput = document.getElementById('fSearch');
        if (searchInput) searchInput.value = qParam;
      }

      if (bodyParam || qParam || fuelParam) {
        applyFilters();
      } else {
        filteredCars = [...cars];
        visibleCount = 6;
        renderCars();
      }

      const carId = params.get('carId');
      if (carId && cars.some((c) => String(c.id) === String(carId))) {
        setTimeout(() => openCarModal(Number(carId)), 300);
      }
    } catch (err) {
      console.error('Failed to load cars from Supabase:', err);
      showGridError();
    }
  }

  window.loadMore = loadMore;
  window.applyFilters = applyFilters;
  window.openCarModal = openCarModal;
  window.toggleWishlist = toggleWishlist;
  window.addCompare = addCompare;
  window.clearCompare = clearCompare;
  window.removeCompare = removeCompare;
  window.doCompare = doCompare;
  window.clearRecent = clearRecent;
  window.openNego = openNego;
  window.submitNego = submitNego;
  window.openPayModal = openPayModal;
  window.submitPayment = submitPayment;

  showGridLoading();
  const t = setTimeout(() => {
    AOS.init({ duration:700, once:true, easing:'ease-out-cubic', offset:80 });
    updateRecentlyViewed();
    updateCompareBar();
    loadCarsFromSupabase();
  }, 300);
  timers.push(t);

  return function cleanup() {
    timers.forEach(clearTimeout);
  };
}