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
      const regLabel = car.regMonth ? `${String(car.regMonth).padStart(2,'0')}/${car.year}` : `${car.year}`;
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
          <div class="car-name sbt-title" onclick="openCarModal(${car.id})">${car.year}${car.regMonth ? '/'+String(car.regMonth).padStart(2,'0') : ''} ${String(car.brand).toUpperCase()} ${car.name}</div>
          <div class="sbt-spec-grid">
            ${row('fa-tachometer-alt','Mileage', car.mileage.toLocaleString()+' km')}
            ${row('fa-hashtag','Model Code', car.modelCode)}
            ${row('fa-cogs','Transmission', car.trans)}
            ${row('fa-gas-pump','Fuel Type', car.fuel)}
            ${row('fa-compass-drafting','Drive', car.drive)}
            ${row('fa-circle-dot','Steering', car.steering)}
            ${row('fa-microchip','Engine', car.displacement ? car.displacement.toLocaleString()+'cc' : car.engine)}
            ${row('fa-door-open','Doors', car.doors)}
          </div>
          <div class="sbt-meta">
            <div><span>Registration:</span> ${regLabel}</div>
            <div><span>Manufacture:</span> ${dash(car.mfgYear)}</div>
            <div><span>Body Type:</span> ${dash(car.body)}</div>
            <div><span>Body color:</span> ${dash(car.color)}</div>
            <div><span>Stock Id:</span> ${dash(car.stockId)}</div>
            <div><span>Location:</span> ${dash(car.location)}</div>
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

  const $ = (id) => document.getElementById(id);
  const val = (id) => ($(id) ? $(id).value : '');
  const fillSelect = (id, first, items) => {
    const el = $(id);
    if (!el) return;
    const keep = el.value;
    el.innerHTML = `<option value="">${first}</option>` +
      items.map((it) => {
        const [v, l] = Array.isArray(it) ? it : [it, it];
        return `<option value="${String(v).replace(/"/g,'&quot;')}">${l}</option>`;
      }).join('');
    if ([...el.options].some((o) => o.value === keep)) el.value = keep;
  };
  const uniq = (arr) => [...new Set(arr.filter((x) => x !== undefined && x !== null && x !== ''))].sort();
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const PRICE_STEPS = [1000,2000,3000,4000,5000,7500,10000,15000,20000,30000,50000,75000,100000];
  const MILE_STEPS = [10000,20000,30000,50000,70000,100000,150000,200000,300000];

  // Make -> Model -> Model Code are dependent dropdowns, built from real stock.
  function refreshModelDropdowns() {
    const make = val('fMake');
    const modelSel = $('fModel'); const codeSel = $('fModelCode');
    if (!modelSel || !codeSel) return;
    modelSel.disabled = !make;
    fillSelect('fModel', 'Select a Model', make ? uniq(cars.filter(c => c.brand === make).map(c => c.name)) : []);
    if (!make) modelSel.value = '';
    refreshCodeDropdown();
  }
  function refreshCodeDropdown() {
    const make = val('fMake'); const model = val('fModel');
    const codeSel = $('fModelCode');
    if (!codeSel) return;
    codeSel.disabled = !(make && model);
    fillSelect('fModelCode', 'Select a Model Code',
      make && model ? uniq(cars.filter(c => c.brand === make && c.name === model).map(c => c.modelCode)) : []);
    if (!(make && model)) codeSel.value = '';
  }
  function refreshMonthDropdowns() {
    ['Min','Max'].forEach((k) => {
      const m = $('fMonth'+k);
      if (!m) return;
      m.disabled = !val('fYear'+k);
      if (m.disabled) m.value = '';
    });
  }

  function buildFilterOptions() {
    fillSelect('fMake', 'Select a Make', uniq(cars.map(c => c.brand)));
    fillSelect('fBody', 'Select a Body Type', uniq(cars.map(c => c.body)));
    fillSelect('fFuel', 'Any Fuel', uniq(cars.map(c => c.fuel)));
    fillSelect('fTrans', 'Any Transmission', uniq(cars.map(c => c.trans)));
    fillSelect('fSteering', 'Any Steering', uniq(cars.map(c => c.steering)));
    fillSelect('fDrive', 'Any Drive', uniq(cars.map(c => c.drive)));
    fillSelect('fPriceMin', 'From', PRICE_STEPS.map(n => [n, '$'+n.toLocaleString()]));
    fillSelect('fPriceMax', 'Up to', PRICE_STEPS.map(n => [n, '$'+n.toLocaleString()]));
    fillSelect('fMileMin', 'From', MILE_STEPS.map(n => [n, n.toLocaleString()]));
    fillSelect('fMileMax', 'Up to', MILE_STEPS.map(n => [n, n.toLocaleString()]));
    const thisYear = new Date().getFullYear();
    const years = []; for (let y = thisYear; y >= 1990; y--) years.push(y);
    fillSelect('fYearMin', 'Year', years);
    fillSelect('fYearMax', 'Year', years);
    ['fMonthMin','fMonthMax'].forEach((id) => fillSelect(id, 'Month', MONTHS.map((m,i) => [i+1, m])));
    refreshModelDropdowns();
    refreshMonthDropdowns();
    const mk = $('fMake'); if (mk) mk.onchange = refreshModelDropdowns;
    const md = $('fModel'); if (md) md.onchange = refreshCodeDropdown;
    ['fYearMin','fYearMax'].forEach((id) => { const e = $(id); if (e) e.onchange = refreshMonthDropdowns; });
  }

  function applyFilters(silent) {
    const search = val('fSearch').trim().toLowerCase();
    const make = val('fMake'), model = val('fModel'), code = val('fModelCode'), body = val('fBody');
    const fuel = val('fFuel'), trans = val('fTrans'), steering = val('fSteering'), drive = val('fDrive');
    const num = (id) => (val(id) === '' ? null : Number(val(id)));
    const pMin = num('fPriceMin'), pMax = num('fPriceMax');
    const mMin = num('fMileMin'), mMax = num('fMileMax');
    // year/month -> comparable number (year*12 + month-1); month optional
    const ym = (y, m, isMax) => (y === null ? null : y*12 + (m !== null ? m-1 : (isMax ? 11 : 0)));
    const yMin = ym(num('fYearMin'), num('fMonthMin'), false);
    const yMax = ym(num('fYearMax'), num('fMonthMax'), true);

    filteredCars = cars.filter(c => {
      if(search && !`${c.brand} ${c.name} ${c.modelCode} ${c.stockId} ${c.chassis}`.toLowerCase().includes(search)) return false;
      if(make && c.brand !== make) return false;
      if(model && c.name !== model) return false;
      if(code && c.modelCode !== code) return false;
      if(body && c.body !== body) return false;
      if(fuel && c.fuel !== fuel) return false;
      if(trans && c.trans !== trans) return false;
      if(steering && c.steering !== steering) return false;
      if(drive && c.drive !== drive) return false;
      if(pMin !== null && c.price < pMin) return false;
      if(pMax !== null && c.price > pMax) return false;
      if(mMin !== null && c.mileage < mMin) return false;
      if(mMax !== null && c.mileage > mMax) return false;
      const carYM = Number(c.year)*12 + (c.regMonth ? c.regMonth-1 : 0);
      if(yMin !== null && carYM < yMin) return false;
      if(yMax !== null && (Number(c.year)*12 + (c.regMonth ? c.regMonth-1 : 11)) > yMax) return false;
      return true;
    });
    visibleCount = 6;
    renderCars();
    const cnt = $('sfCount'); if (cnt) cnt.textContent = `(${filteredCars.length})`;
    if (silent !== true) window.showToast(`Found ${filteredCars.length} vehicle${filteredCars.length!==1?'s':''}`, 'info');
  }

  function resetFilters() {
    ['fMake','fModel','fModelCode','fBody','fFuel','fTrans','fSteering','fDrive','fPriceMin','fPriceMax',
     'fMileMin','fMileMax','fYearMin','fMonthMin','fYearMax','fMonthMax','fSearch'].forEach((id) => { if ($(id)) $(id).value = ''; });
    refreshModelDropdowns();
    refreshMonthDropdowns();
    applyFilters(true);
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
      <div class="sbt-detail-table">
        ${[
          ['Make / Model', `${car.brand} ${car.name}`],
          ['Model Code', car.modelCode],
          ['Registration (Month/Year)', car.regMonth ? `${String(car.regMonth).padStart(2,'0')}.${car.year}` : car.year],
          ['Manufacture Year', car.mfgYear],
          ['Color', car.color],
          ['Mileage', car.mileage.toLocaleString()+' km'],
          ['Repaired', car.repair],
          ['Steering', car.steering],
          ['Transmission', car.trans],
          ['Fuel', car.fuel],
          ['Drive', car.drive],
          ['Doors', car.doors ? car.doors+'D' : ''],
          ['Seats', car.seats],
          ['Displacement', car.displacement ? car.displacement.toLocaleString()+'cc' : car.engine],
          ['Engine Code', car.engineCode],
          ['Power', car.hp ? car.hp+' HP' : ''],
          ['Body Type', car.body],
          ['Chassis No.', car.chassis],
          ['Stock Id', car.stockId],
          ['Location', car.location],
        ].map(([k,v]) => `<div class="sbt-detail-row"><span>${k}</span><b>${v === undefined || v === null || v === '' ? '-' : v}</b></div>`).join('')}
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
        modelCode: row.model_code || '',
        chassis: row.chassis_number || '',
        regMonth: row.reg_month || null,
        mfgYear: row.manufacture_year || null,
        repair: row.repair_history || '',
        steering: row.steering || '',
        drive: row.drive || '',
        doors: row.doors || null,
        seats: row.seats || null,
        displacement: row.displacement_cc || null,
        engineCode: row.engine_code || '',
        location: row.location || '',
        imgs: row.images && row.images.length ? row.images : ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'],
        desc: row.description,
      }));

      buildFilterOptions();

      const params = new URLSearchParams(window.location.search);
      const setSel = (id, v) => {
        const el = $(id);
        if (el && v && [...el.options].some(o => o.value === v)) { el.value = v; return true; }
        return false;
      };
      let any = false;
      const use = (id, v) => { if (setSel(id, v)) any = true; };
      use('fMake', params.get('make') || params.get('brand'));
      refreshModelDropdowns();
      use('fModel', params.get('model'));
      refreshCodeDropdown();
      use('fModelCode', params.get('modelCode'));
      use('fBody', params.get('body'));
      use('fFuel', params.get('fuel'));
      use('fTrans', params.get('trans'));
      use('fSteering', params.get('steering'));
      use('fDrive', params.get('drive'));
      use('fPriceMin', params.get('priceMin'));
      use('fPriceMax', params.get('priceMax'));
      use('fMileMin', params.get('mileageMin'));
      use('fMileMax', params.get('mileageMax'));
      use('fYearMin', params.get('yearMin'));
      use('fYearMax', params.get('yearMax'));
      refreshMonthDropdowns();
      use('fMonthMin', params.get('monthMin'));
      use('fMonthMax', params.get('monthMax'));
      const q = params.get('q');
      if (q && $('fSearch')) { $('fSearch').value = q; any = true; }

      if (any) { applyFilters(true); }
      else { filteredCars = [...cars]; visibleCount = 6; renderCars(); const cnt = $('sfCount'); if (cnt) cnt.textContent = `(${cars.length})`; }

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
  window.applyFilters = () => applyFilters();
  window.resetFilters = resetFilters;
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