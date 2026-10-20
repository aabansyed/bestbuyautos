import { gsap } from "gsap";
import AOS from "aos";
import { fetchPublicCars } from "../../lib/carsApi";
import { submitEmailQuery } from "../../lib/emailQueriesApi";
// Price helper: CurrencyContext ka window.formatPrice use karta hai.
// data-price-usd attribute ki wajah se CurrencyContext ka MutationObserver
// currency badalne par is price ko khud update kar deta hai.
const fmt = (n) =>
  typeof window.formatPrice === "function"
    ? window.formatPrice(Number(n))
    : `$${Number(n).toLocaleString()}`;

const priceSpan = (usd, cls = "") =>
  `<span ${cls ? `class="${cls}" ` : ""}data-price-usd="${Number(usd)}">${fmt(usd)}</span>`;

export function initStockCarsPage() {
  const timers = [];

  let cars = [];
  let visibleCount = 6;
  let wishlist = JSON.parse(localStorage.getItem('bba_wishlist') || '[]');
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
      const card = document.createElement('div');
      card.className = 'car-card';
      card.setAttribute('data-aos', i%3===0?'fade-up':i%3===1?'fade-left':'fade-right');
      card.setAttribute('data-aos-delay', (i%3)*80+'');
      const dash = (v) => (v === undefined || v === null || v === '' ? '-' : v);
      const row = (icon, label, value) => `
            <div class="sbt-spec">
              <i class="fas ${icon}"></i>
              <div><div class="sbt-spec-val">${dash(value)}</div><div class="sbt-spec-label">${label}</div></div>
            </div>`;
      card.innerHTML = `
        <div class="car-img-wrap" onclick="openCarModal(${car.id})">
          <img src="${car.imgs[0]}" alt="${car.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'"/>
          <div class="car-wishlist ${inWish?'active':''}" onclick="toggleWishlist(event,${car.id})" title="Wishlist">
            <i class="fa${inWish?'s':'r'} fa-heart"></i>
          </div>
        </div>
        <div class="car-body">
          <div class="sbt-tags">
            <span class="sbt-tag sbt-tag-stock">BBA Stock</span>
            ${car.badge ? `<span class="sbt-tag sbt-tag-${car.badge==='Hot'?'hot':'new'}">${car.badge==='New'?'New Arrival':car.badge}</span>` : ''}
          </div>
          <div class="car-name sbt-title" onclick="openCarModal(${car.id})">${car.year} ${String(car.brand).toUpperCase()} ${car.name}</div>
          <div class="sbt-spec-grid">
            ${row('fa-tachometer-alt','Mileage', car.mileage.toLocaleString()+' km')}
            ${row('fa-gas-pump','Fuel Type', car.fuel)}
            ${row('fa-cogs','Transmission', car.trans)}
            ${row('fa-car-side','Body Type', car.body)}
            ${row('fa-microchip','Engine', car.engine)}
            ${row('fa-bolt','Power', car.hp ? car.hp+' HP' : '')}
          </div>
          <div class="sbt-meta">
            <div><span>Registration:</span> ${car.year}</div>
            <div><span>Body color:</span> ${dash(car.color)}</div>
          </div>
          <div class="car-footer sbt-footer">
            <div>
              <div class="sbt-price-label">Vehicle Price</div>
              <div class="car-price">${priceSpan(car.price)}</div>
            </div>
            <button class="btn-card btn-card-primary" onclick="openCarModal(${car.id})">View Details</button>
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
    const year = document.getElementById('fYear')?.value || '';

    filteredCars = cars.filter(c => {
      if(search && !`${c.brand} ${c.name}`.toLowerCase().includes(search)) return false;
      if(brand && c.brand !== brand) return false;
      if(fuel && c.fuel !== fuel) return false;
      if(trans && c.trans !== trans) return false;
      if(body && c.body !== body) return false;
      if(c.mileage > maxMiles) return false;
      if(year) {
        const [lo, hi] = year.split(/[-–]/).map(Number);
        const maxYear = hi || lo;
        const cy = Number(c.year);
        if(cy < lo || cy > maxYear) return false;
      }
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
          <div class="modal-price">${priceSpan(car.price)}</div>
          <div style="font-size:.75rem;color:var(--gray);margin-top:4px">+ Shipping & Customs (varies by country)</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:.75rem;color:var(--gray)">Stock Status</div>
          <div style="color:#2ecc71;font-weight:700;margin-top:4px"><i class="fas fa-circle" style="font-size:.5rem;margin-right:4px"></i>Available</div>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn-modal btn-buy" onclick="openPayModal(${car.id})"><i class="fas fa-envelope"></i> Verify via Email</button>
        <a class="btn-modal btn-whatsapp" href="https://wa.me/81?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(car.name)}%2C%20please%20share%20details" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
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
          <div class="recent-mini-price">${priceSpan(c.price)}</div>
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

  let payCar = null;

  function openPayModal(id) {
    const car = cars.find(c=>c.id===id);
    if(!car) return;
    payCar = car;
    const stock = String(car.stockId);
    const setText = (el, v) => { const n = document.getElementById(el); if (n) n.textContent = v; };
    const setVal = (el, v) => { const n = document.getElementById(el); if (n) n.value = v; };

    const img = document.getElementById('payCarImg');
    if (img) img.src = car.imgs[0];
    setText('payCarName', `${car.year} ${String(car.brand).toUpperCase()} ${car.name}`);
    setText('payCarStock', `Stock Id : ${stock}`);

    const payPrice = document.getElementById('payCarPrice');
    if (payPrice) {
      payPrice.setAttribute('data-price-usd', String(Number(car.price)));
      payPrice.textContent = fmt(car.price);
    }

    setVal('payName', '');
    setVal('payEmail', '');
    setVal('payPhone', '');
    setVal('payWhatsapp', '');
    setVal('payRemarks', stock);

    window.closeModal('carModal');
    window.openModal('payModal');
  }

  let submitting = false;

async function submitPayment() {
  if (submitting) return;
  const v = (id) => (document.getElementById(id)?.value || '').trim();
  const name = v('payName');
  const email = v('payEmail');
  const remarks = v('payRemarks');

  if (!name || !email || !remarks) {
    window.showToast('Please fill all required fields', 'info');
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    window.showToast('Please enter a valid email address', 'info');
    return;
  }

  submitting = true;
  try {
    await submitEmailQuery({
      name,
      email,
      phoneCode: v('payCode'),
      phone: v('payPhone').replace(/^0+/, ''),
      whatsapp: v('payWhatsapp').replace(/^0+/, ''),
      remarks,
      carTitle: payCar ? `${payCar.year} ${payCar.brand} ${payCar.name}` : null,
      stockId: payCar ? payCar.stockId : null,
      carPrice: payCar ? payCar.price : null,
    });
    window.closeModal('payModal');
    window.showToast('Thank you! Your request has been sent. We will contact you soon ✅', 'success');
  } catch (err) {
    console.error('Email query submit failed:', err);
    window.showToast('Could not send your request. Please try again.', 'info');
  } finally {
    submitting = false;
  }
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
        stockId: row.stock_id || row.id,
        imgs: row.images && row.images.length ? row.images : ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'],
        desc: row.description,
      }));

      const params = new URLSearchParams(window.location.search);
      const bodyParam = params.get('body');
      const qParam = params.get('q');
      const fuelParam = params.get('fuel');
      const brandParam = params.get('brand');
      const priceParam = params.get('price');
      const yearParam = params.get('year');
      const mileageParam = params.get('mileage');
      const setSelect = (id, val) => {
        const el = document.getElementById(id);
        if (el && val && [...el.options].some(o => o.value === val)) el.value = val;
      };
      setSelect('fBrand', brandParam);
      setSelect('fPrice', priceParam);
      setSelect('fYear', yearParam);
      if (mileageParam) {
        const mEl = document.getElementById('fMileage');
        if (mEl) mEl.value = mileageParam;
      }
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

      if (bodyParam || qParam || fuelParam || brandParam || priceParam || yearParam || mileageParam) {
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
  window.clearRecent = clearRecent;
  window.openPayModal = openPayModal;
  window.submitPayment = submitPayment;

  showGridLoading();
  const t = setTimeout(() => {
    AOS.init({ duration:700, once:true, easing:'ease-out-cubic', offset:80 });
    updateRecentlyViewed();
    loadCarsFromSupabase();
  }, 300);
  timers.push(t);

  return function cleanup() {
    timers.forEach(clearTimeout);
  };
} 