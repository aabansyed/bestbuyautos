// NEW FILE: src/pages/BestBuyAutoHome.jsx
// Slider ke baad ka poora homepage. Slider apne existing component se upar render karo:
//   <HeroSlider />  <BestBuyAutoHome onNavigate={(url) => navigate({ to: url })} />
import { useEffect, useMemo, useState } from "react";
import { fetchHome } from "../data/homeData";

const CSS = `
.bb{--red:#E60012;--red-d:#AC060B;--text:#212529;--line:#DADADA;--link:#437EC4;--soft:#F6F6F6;
font:12px/1.5 Roboto,"Helvetica Neue",Arial,sans-serif;color:var(--text);background:#fff}
.bb *{box-sizing:border-box}.bb a{color:var(--link);text-decoration:none}.bb a:hover{color:var(--red-d);text-decoration:underline}
.bb .wrap{max-width:1200px;margin:0 auto;padding:0 12px}
.bb h2{font-size:14px;font-weight:700;margin:0 0 8px;padding-left:8px;border-left:4px solid var(--red)}
.bb .btn{border:0;border-radius:5px;background:var(--red);color:#fff;font:700 13px Roboto,Arial,sans-serif;padding:9px 16px;cursor:pointer}
.bb .btn:hover{background:var(--red-d)}
.bb .btn.sec{background:#fff;color:var(--link);border:1px solid var(--line);border-radius:4px;padding:5px 10px;font-size:12px}
.bb .search{background:#fff;border:2px solid var(--red);border-radius:5px;padding:12px;margin:12px 0}
.bb .fields{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
.bb label{display:block;font-size:11px;font-weight:700;margin-bottom:2px}
.bb select{width:100%;height:34px;border:1px solid var(--line);border-radius:4px;background:#fff;color:var(--text);font:12px Roboto,Arial,sans-serif;padding:0 6px}
.bb select:focus,.bb button:focus-visible{outline:2px solid var(--red);outline-offset:1px}
.bb .sinfo{display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px;margin:8px 0}
.bb .scam{background:#FFF4CC;border:1px solid #E6B800;border-left:5px solid var(--red);border-radius:4px;margin:12px 0;padding:8px 12px;display:flex;gap:10px;align-items:flex-start}
.bb .scam button{margin-left:auto;background:none;border:0;font-size:16px;cursor:pointer;color:var(--text)}
.bb .promos{display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;margin:12px 0}
.bb .promo{border:0;text-align:left;border-radius:4px;padding:14px;color:#fff;min-height:104px;cursor:pointer;font-family:inherit;display:flex;flex-direction:column;justify-content:space-between}
.bb .promo:hover{filter:brightness(.93)}.bb .promo h3{margin:0;font-size:18px;font-weight:900}
.bb .red{background:var(--red)}.bb .dark{background:#212529}.bb .deep{background:var(--red-d)}
.bb .promo em{font-style:normal;font-weight:700;background:#fff;color:var(--red);border-radius:4px;padding:2px 8px;align-self:flex-start;font-size:11px}
.bb .grid{display:grid;gap:6px}.bb .sec{margin-bottom:16px}
.bb .tile{display:flex;justify-content:space-between;align-items:center;gap:6px;border:1px solid var(--line);border-radius:4px;background:#fff;padding:8px;font:inherit;color:var(--text);cursor:pointer;text-align:left}
.bb .tile:hover,.bb .tile.on{border-color:var(--red)}.bb .tile.on{background:#fff5f5}
.bb .tile b{font-weight:700}.bb .tile i{font-style:normal;color:var(--link);font-size:11px}
.bb .cols{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.bb .tabs{display:flex;gap:4px;align-items:center;flex-wrap:wrap;margin-bottom:8px}
.bb .tabs button{font:500 12px Roboto,Arial,sans-serif;border:1px solid var(--line);background:#fff;padding:5px 12px;border-radius:4px;cursor:pointer}
.bb .tabs button.on{background:var(--red);border-color:var(--red);color:#fff}
.bb .tabs select{width:auto;margin-left:auto;height:28px}
.bb .cars{grid-template-columns:repeat(5,1fr)}
.bb .car{border:1px solid var(--line);border-radius:4px;background:#fff;display:flex;flex-direction:column}
.bb .car .img{height:72px;background:var(--soft);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:22px;color:var(--line);position:relative}
.bb .car .img span{position:absolute;top:4px;left:4px;background:var(--red);color:#fff;font-size:10px;font-weight:700;padding:0 6px;border-radius:3px}
.bb .car .in{padding:8px;display:flex;flex-direction:column;gap:2px;flex:1}
.bb .car .p{color:var(--red);font-weight:900;font-size:16px}.bb .car small{color:#666}
.bb .car .row{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:6px}
.bb .cmp{position:sticky;bottom:0;background:#212529;color:#fff;padding:8px 12px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;z-index:5;padding-bottom:calc(8px + env(safe-area-inset-bottom,0px))}
.bb .sk{background:linear-gradient(90deg,#eee,#f8f8f8,#eee);background-size:200% 100%;animation:bbs 1.2s infinite;border-radius:4px;height:44px}
@keyframes bbs{to{background-position:-200% 0}}
.bb .empty{border:1px dashed var(--line);padding:24px;text-align:center;border-radius:4px}
@media(max-width:960px){.bb .fields{grid-template-columns:repeat(3,1fr)}.bb .cars{grid-template-columns:repeat(3,1fr)}.bb .cols{grid-template-columns:1fr}.bb .promos{grid-template-columns:1fr 1fr}.bb .promo:first-child{grid-column:1/-1}}
@media(max-width:560px){.bb .fields{grid-template-columns:1fr 1fr}.bb .cars{grid-template-columns:1fr 1fr}.bb .tile,.bb select{min-height:36px}}
`;

const EMPTY = { make: "", model: "", type: "", price: "", year: "", km: "" };
const fmt = (n) => Number(n).toLocaleString("en-US");

export default function BestBuyAutoHome({ onNavigate }) {
  const [data, setData] = useState(null);
  const [f, setF] = useState(EMPTY);
  const [tab, setTab] = useState("weekly");
  const [sort, setSort] = useState("default");
  const [cmp, setCmp] = useState([]);
  const [showScam, setShowScam] = useState(() => {
    try { return localStorage.getItem("bb_scam_hidden") !== "1"; } catch { return true; }
  });

  useEffect(() => { let ok = true; fetchHome().then((d) => ok && setData(d)); return () => { ok = false; }; }, []);

  const set = (k, v) => setF((p) => ({ ...p, [k]: v, ...(k === "make" ? { model: "" } : {}) }));
  const scrollSearch = () => document.getElementById("bb-search")?.scrollIntoView({ behavior: "smooth" });

  const matches = useMemo(() => {
    if (!data) return [];
    const pr = data.prices[f.price];
    return data.vehicles.filter((v) =>
      (!f.make || v.make === f.make) &&
      (!f.model || v.title.includes(f.model)) &&
      (!f.type || v.type === f.type) &&
      (!pr || (v.price >= pr.min && v.price < pr.max)) &&
      (!f.year || v.year >= +f.year) &&
      (!f.km || v.km <= +f.km));
  }, [data, f]);

  const list = useMemo(() => {
    const l = matches.filter((v) => v.tags.includes(tab));
    if (sort === "low") return [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...l].sort((a, b) => b.price - a.price);
    if (sort === "km") return [...l].sort((a, b) => a.km - b.km);
    return l;
  }, [matches, tab, sort]);

  const go = () => {
    const q = new URLSearchParams(Object.entries({ ...f, price: data?.prices[f.price]?.label || "" }).filter(([, v]) => v)).toString();
    const url = `/used-cars${q ? "?" + q : ""}`;
    onNavigate ? onNavigate(url) : (window.location.href = url);
  };
  const toggleCmp = (id) => setCmp((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < 3 ? [...c, id] : c));
  const hideScam = () => { setShowScam(false); try { localStorage.setItem("bb_scam_hidden", "1"); } catch { /* ignore */ } };

  const models = (data && data.models[f.make]) || [];
  const cmpCars = data ? data.vehicles.filter((v) => cmp.includes(v.id)) : [];

  return (
    <div className="bb">
      <style>{CSS}</style>
      <div className="wrap">
        <div className="search" id="bb-search">
          <div className="fields">
            <div><label htmlFor="bb-make">Make</label>
              <select id="bb-make" value={f.make} onChange={(e) => set("make", e.target.value)}>
                <option value="">Any Make</option>{data?.brands.map((b) => <option key={b.name}>{b.name}</option>)}</select></div>
            <div><label htmlFor="bb-model">Model</label>
              <select id="bb-model" value={f.model} onChange={(e) => set("model", e.target.value)} disabled={!models.length}>
                <option value="">Any Model</option>{models.map((m) => <option key={m}>{m}</option>)}</select></div>
            <div><label htmlFor="bb-type">Body Type</label>
              <select id="bb-type" value={f.type} onChange={(e) => set("type", e.target.value)}>
                <option value="">Any Type</option>{data?.bodies.map((b) => <option key={b.name}>{b.name}</option>)}</select></div>
            <div><label htmlFor="bb-price">Vehicle Price</label>
              <select id="bb-price" value={f.price} onChange={(e) => set("price", e.target.value)}>
                <option value="">Any Price</option>{data?.prices.map((p, i) => <option key={p.label} value={i}>{p.label}</option>)}</select></div>
            <div><label htmlFor="bb-year">Year</label>
              <select id="bb-year" value={f.year} onChange={(e) => set("year", e.target.value)}>
                <option value="">Any Year</option>{[2023, 2020, 2015, 2010].map((y) => <option key={y} value={y}>{y}+</option>)}</select></div>
            <div><label htmlFor="bb-km">Mileage</label>
              <select id="bb-km" value={f.km} onChange={(e) => set("km", e.target.value)}>
                <option value="">Any Mileage</option>{[30000, 60000, 100000, 150000].map((k) => <option key={k} value={k}>Under {fmt(k)} km</option>)}</select></div>
          </div>
          <div className="sinfo">
            <span>{data ? <><b>{matches.length}</b> of {data.vehicles.length} featured cars match · {fmt(data.total)} in total stock</> : "Loading inventory…"}</span>
            <a href="#reset" onClick={(e) => { e.preventDefault(); setF(EMPTY); }}>Reset filters</a>
          </div>
          <button className="btn" style={{ width: "100%", fontSize: 16, padding: 12 }} onClick={go}>
            🔍 SEARCH {data ? fmt(data.total) : ""} CARS</button>
        </div>

        {showScam && (
          <div className="scam" role="alert">
            <b style={{ color: "var(--red-d)" }}>Scam Warning:</b>
            <span>Best Buy Auto never asks for payment to a personal account. Verify bank details only inside your official account page. <a href="/report-scam">Report a suspicious message</a>.</span>
            <button aria-label="Dismiss warning" onClick={hideScam}>×</button>
          </div>
        )}

        <div className="promos">
          {!data ? [0, 1, 2].map((i) => <div key={i} className="sk" style={{ height: 104 }} />) :
            data.promos.map((p) => (
              <button key={p.id} className={`promo ${p.tone}`} onClick={() => { setTab(p.id === "suv" ? "suv" : p.id); document.getElementById("bb-cars")?.scrollIntoView({ behavior: "smooth" }); }}>
                <span><h3>{p.title}</h3>{p.sub}</span><em>View {fmt(p.count)} ›</em></button>))}
        </div>

        <section className="sec">
          <h2>Search by Make</h2>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))" }}>
            {!data ? Array.from({ length: 16 }, (_, i) => <div key={i} className="sk" />) :
              data.brands.map((b) => (
                <button key={b.name} className={`tile ${f.make === b.name ? "on" : ""}`} onClick={() => { set("make", f.make === b.name ? "" : b.name); scrollSearch(); }}>
                  <b>{b.name}</b><i>({fmt(b.count)})</i></button>))}
          </div>
        </section>

        <section className="sec">
          <h2>Search by Body Type</h2>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))" }}>
            {!data ? Array.from({ length: 12 }, (_, i) => <div key={i} className="sk" />) :
              data.bodies.map((b) => (
                <button key={b.name} className={`tile ${f.type === b.name ? "on" : ""}`} onClick={() => set("type", f.type === b.name ? "" : b.name)}>
                  <b>{b.name}</b><i>({fmt(b.count)})</i></button>))}
          </div>
        </section>

        <section className="sec" id="bb-cars">
          <h2>Featured Vehicles</h2>
          <div className="tabs">
            {[["weekly", "Weekly Specials"], ["new", "New Arrivals"], ["trucks", "Trucks"], ["suv", "SUV & 4WD"]].map(([id, l]) => (
              <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{l}</button>))}
            <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="default">Sort: Recommended</option><option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option><option value="km">Mileage: Lowest</option></select>
          </div>
          <div className="grid cars">
            {!data ? Array.from({ length: 5 }, (_, i) => <div key={i} className="sk" style={{ height: 190 }} />) :
              list.length === 0 ? <div className="empty" style={{ gridColumn: "1/-1" }}>No cars match these filters. <a href="#reset" onClick={(e) => { e.preventDefault(); setF(EMPTY); }}>Reset filters</a></div> :
                list.map((v) => (
                  <article key={v.id} className="car">
                    <div className="img">{v.make[0]}{v.tags.includes("weekly") && <span>SPECIAL</span>}</div>
                    <div className="in">
                      <b>{v.title}</b>
                      <small>{v.year} · {fmt(v.km)} km · {v.type}</small>
                      <div className="p">${fmt(v.price)}</div>
                      <div className="row">
                        <label style={{ margin: 0, fontWeight: 400 }}><input type="checkbox" checked={cmp.includes(v.id)} onChange={() => toggleCmp(v.id)} /> Compare</label>
                        <a href={`/cars/${v.id}`}>Details ›</a>
                      </div>
                    </div>
                  </article>))}
          </div>
        </section>

        <div className="cols">
          <section className="sec"><h2>Search by Price</h2>
            <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {data?.prices.map((p, i) => (
                <button key={p.label} className={`tile ${f.price === String(i) ? "on" : ""}`} onClick={() => set("price", f.price === String(i) ? "" : String(i))}>
                  <b>{p.label}</b><i>({fmt(p.count)})</i></button>))}</div></section>
          <section className="sec"><h2>Search by Country</h2>
            <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {data?.countries.map((c) => <a key={c} className="tile" href={`/country/${c.toLowerCase().replace(/\s+/g, "-")}`}><b>{c}</b></a>)}</div></section>
        </div>
      </div>

      {cmpCars.length > 0 && (
        <div className="cmp" role="region" aria-label="Compare vehicles">
          <b>Compare ({cmpCars.length}/3):</b>
          {cmpCars.map((c) => <span key={c.id}>{c.title} · ${fmt(c.price)}</span>)}
          <button className="btn" style={{ marginLeft: "auto" }} disabled={cmpCars.length < 2} onClick={() => (onNavigate ? onNavigate : (u) => (window.location.href = u))(`/compare?ids=${cmp.join(",")}`)}>Compare now</button>
          <button className="btn sec" onClick={() => setCmp([])}>Clear</button>
        </div>
      )}
    </div>
  );
}