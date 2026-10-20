import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { fetchPublicCars } from "../lib/carsApi";
import { fetchMakes, fetchModels, fetchBodyTypesCatalog } from "../lib/catalogApi";
import "../styles/hero-search.css";

const PRICE_STEPS = [1000, 2000, 3000, 4000, 5000, 7500, 10000, 15000, 20000, 30000, 50000, 75000, 100000];
const MILE_STEPS = [10000, 20000, 30000, 50000, 70000, 100000, 150000, 200000, 300000];
const THIS_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: THIS_YEAR - 1989 }, (_, i) => THIS_YEAR - i);

const TABS = [
  { id: "make", label: "Make and model", next: "Select Make and model" },
  { id: "body", label: "Body Type", next: "Select Body Type" },
  { id: "price", label: "Vehicle Price", next: "Select Vehicle Price" },
  { id: "year", label: "Year", next: "Select Year" },
  { id: "mileage", label: "Mileage", next: "Select Mileage" },
];

const EMPTY = { make: "", model: "", body: "", priceMin: "", priceMax: "", yearMin: "", yearMax: "", mileMin: "", mileMax: "" };

function MakeLogo({ make }) {
  const [bad, setBad] = useState(false);
  if (make.logo_url && !bad) {
    return <img src={make.logo_url} alt={make.name} onError={() => setBad(true)} />;
  }
  return <span className="hs-monogram">{make.name.slice(0, 1)}</span>;
}

function RangeSelects({ title, from, to, onFrom, onTo, options, fmt }) {
  return (
    <div className="hs-range">
      <div className="hs-pane-title">{title}</div>
      <div className="hs-range-row">
        <select value={from} onChange={(e) => onFrom(e.target.value)}>
          <option value="">From</option>
          {options.map((o) => <option key={o} value={o}>{fmt(o)}</option>)}
        </select>
        <span>~</span>
        <select value={to} onChange={(e) => onTo(e.target.value)}>
          <option value="">Up to</option>
          {options.map((o) => <option key={o} value={o}>{fmt(o)}</option>)}
        </select>
      </div>
    </div>
  );
}

export default function HeroSearch() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [bodies, setBodies] = useState([]);
  const [sel, setSel] = useState(EMPTY);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("make");
  const [showAllMakes, setShowAllMakes] = useState(false);

  useEffect(() => {
    let off = false;
    (async () => {
      const [c, mk, md, bd] = await Promise.all([
        fetchPublicCars().catch(() => []),
        fetchMakes().catch(() => []),
        fetchModels().catch(() => []),
        fetchBodyTypesCatalog().catch(() => []),
      ]);
      if (off) return;
      setCars(c);
      // Fallback: if the catalog tables are empty/missing, derive from stock
      setMakes(mk.length ? mk : [...new Set(c.map((x) => x.brand).filter(Boolean))].sort().map((name, i) => ({ id: `d${i}`, name, logo_url: "" })));
      setModels(md);
      setBodies(bd.length ? bd : [...new Set(c.map((x) => x.body).filter(Boolean))].sort().map((name, i) => ({ id: `d${i}`, name, icon_url: "" })));
    })();
    return () => { off = true; };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const set = (patch) => setSel((s) => ({ ...s, ...patch }));

  const matches = useMemo(() => {
    const n = (v) => (v === "" ? null : Number(v));
    const pMin = n(sel.priceMin), pMax = n(sel.priceMax), yMin = n(sel.yearMin), yMax = n(sel.yearMax), mMin = n(sel.mileMin), mMax = n(sel.mileMax);
    return cars.filter((c) => {
      if (sel.make && c.brand !== sel.make) return false;
      if (sel.model && c.name !== sel.model) return false;
      if (sel.body && c.body !== sel.body) return false;
      if (pMin !== null && Number(c.price) < pMin) return false;
      if (pMax !== null && Number(c.price) > pMax) return false;
      if (yMin !== null && Number(c.year) < yMin) return false;
      if (yMax !== null && Number(c.year) > yMax) return false;
      if (mMin !== null && Number(c.mileage) < mMin) return false;
      if (mMax !== null && Number(c.mileage) > mMax) return false;
      return true;
    });
  }, [cars, sel]);

  const countBy = (key, value) => cars.filter((c) => c[key] === value).length;

  const makeObj = makes.find((m) => m.name === sel.make);
  const modelList = useMemo(() => {
    if (!makeObj) return [];
    const fromCatalog = models.filter((m) => m.make_id === makeObj.id).map((m) => m.name);
    const fromStock = cars.filter((c) => c.brand === makeObj.name).map((c) => c.name);
    return [...new Set([...fromCatalog, ...fromStock])].sort();
  }, [makeObj, models, cars]);

  const openAt = (id) => { setTab(id); setOpen(true); };
  const tabIdx = TABS.findIndex((t) => t.id === tab);
  const prevTab = TABS[tabIdx - 1];
  const nextTab = TABS[tabIdx + 1];

  const runSearch = () => {
    const p = new URLSearchParams();
    if (sel.make) p.set("make", sel.make);
    if (sel.model) p.set("model", sel.model);
    if (sel.body) p.set("body", sel.body);
    if (sel.priceMin) p.set("priceMin", sel.priceMin);
    if (sel.priceMax) p.set("priceMax", sel.priceMax);
    if (sel.yearMin) p.set("yearMin", sel.yearMin);
    if (sel.yearMax) p.set("yearMax", sel.yearMax);
    if (sel.mileMin) p.set("mileageMin", sel.mileMin);
    if (sel.mileMax) p.set("mileageMax", sel.mileMax);
    setOpen(false);
    const qs = p.toString();
    navigate(`/stock-cars${qs ? `?${qs}` : ""}`);
  };

  const range = (a, b, f = (x) => x) => (a || b ? `${a ? f(a) : "From"} ~ ${b ? f(b) : "Up to"}` : "From ~ Up to");
  const usd = (n) => `$${Number(n).toLocaleString()}`;
  const bigMakes = makes.slice(0, 8);
  const smallMakes = makes.slice(8);

  const rows = [
    { id: "make", text: sel.make ? `${sel.make}${sel.model ? ` › ${sel.model}` : ""}` : "Select a Make and Model", filled: !!sel.make },
    { id: "body", text: sel.body || "Select Body Type", filled: !!sel.body },
    { id: "price", text: range(sel.priceMin, sel.priceMax, usd), filled: !!(sel.priceMin || sel.priceMax) },
    { id: "year", text: range(sel.yearMin, sel.yearMax), filled: !!(sel.yearMin || sel.yearMax) },
    { id: "mileage", text: range(sel.mileMin, sel.mileMax, (x) => `${Number(x).toLocaleString()} km`), filled: !!(sel.mileMin || sel.mileMax) },
  ];

  return (
    <div className="hero-search">
      <h2 className="hero-search-title">DRIVE WHAT'S NEXT</h2>

      <div className="hero-search-card">
        <div className="hero-search-count">{matches.length.toLocaleString()} Cars</div>

        {rows.map((r) => (
          <button type="button" key={r.id} className={`hs-field hs-row ${r.filled ? "is-filled" : ""}`} onClick={() => openAt(r.id)}>
            <span>{r.text}</span>
            <i className="fas fa-circle-plus"></i>
          </button>
        ))}

        <button type="button" className="hero-search-btn" onClick={runSearch}>
          <i className="fas fa-search"></i> Search
        </button>
      </div>

      {open && createPortal(
        <div className="hs-overlay" onClick={() => setOpen(false)}>
          <div className="hs-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="hs-close" aria-label="Close" onClick={() => setOpen(false)}><i className="fas fa-xmark"></i></button>

            <div className="hs-tabs">
              {TABS.map((t) => (
                <button type="button" key={t.id} className={`hs-tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
                  {t.label} {t.id !== "mileage" && <i className="fas fa-chevron-right"></i>}
                </button>
              ))}
            </div>

            <div className="hs-body">
              {tab === "make" && (
                <>
                  <div className="hs-pane-title">Select make</div>
                  <div className="hs-make-grid big">
                    {bigMakes.map((m) => (
                      <button type="button" key={m.id} className={`hs-make ${sel.make === m.name ? "selected" : ""}`} onClick={() => set({ make: sel.make === m.name ? "" : m.name, model: "" })}>
                        <MakeLogo make={m} />
                        <span><b>{m.name}</b><small>({countBy("brand", m.name).toLocaleString()})</small></span>
                      </button>
                    ))}
                  </div>
                  {smallMakes.length > 0 && (
                    <div className="hs-make-grid small">
                      {(showAllMakes ? smallMakes : smallMakes.slice(0, 12)).map((m) => (
                        <button type="button" key={m.id} className={`hs-make ${sel.make === m.name ? "selected" : ""}`} onClick={() => set({ make: sel.make === m.name ? "" : m.name, model: "" })}>
                          <MakeLogo make={m} />
                          <span><b>{m.name}</b><small>({countBy("brand", m.name).toLocaleString()})</small></span>
                        </button>
                      ))}
                    </div>
                  )}
                  {smallMakes.length > 12 && (
                    <button type="button" className="hs-link" onClick={() => setShowAllMakes((v) => !v)}>
                      {showAllMakes ? "Show fewer makes" : `Show all makes (${makes.length})`} <i className="fas fa-chevron-right"></i>
                    </button>
                  )}

                  {sel.make && (
                    <div className="hs-models">
                      <div className="hs-pane-title">Select model — {sel.make}</div>
                      <div className="hs-chips">
                        <button type="button" className={`hs-chip ${!sel.model ? "selected" : ""}`} onClick={() => set({ model: "" })}>All models</button>
                        {modelList.map((m) => (
                          <button type="button" key={m} className={`hs-chip ${sel.model === m ? "selected" : ""}`} onClick={() => set({ model: m })}>
                            {m} <small>({cars.filter((c) => c.brand === sel.make && c.name === m).length})</small>
                          </button>
                        ))}
                        {modelList.length === 0 && <span className="hs-muted">No models added for this make yet.</span>}
                      </div>
                    </div>
                  )}
                </>
              )}

              {tab === "body" && (
                <>
                  <div className="hs-pane-title">Select Body Type</div>
                  <div className="hs-body-grid">
                    <button type="button" className={`hs-bt ${!sel.body ? "selected" : ""}`} onClick={() => set({ body: "" })}>
                      <span className="hs-bt-none">Select None</span>
                    </button>
                    {bodies.map((b) => (
                      <button type="button" key={b.id} className={`hs-bt ${sel.body === b.name ? "selected" : ""}`} onClick={() => set({ body: b.name })}>
                        {b.icon_url ? <img src={b.icon_url} alt="" /> : <i className="fas fa-car-side"></i>}
                        <span><b>{b.name}</b><small>({countBy("body", b.name).toLocaleString()})</small></span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {tab === "price" && (
                <RangeSelects title="Select a vehicle price range" from={sel.priceMin} to={sel.priceMax}
                  onFrom={(v) => set({ priceMin: v })} onTo={(v) => set({ priceMax: v })} options={PRICE_STEPS} fmt={usd} />
              )}
              {tab === "year" && (
                <RangeSelects title="Select a year range" from={sel.yearMin} to={sel.yearMax}
                  onFrom={(v) => set({ yearMin: v })} onTo={(v) => set({ yearMax: v })} options={YEARS} fmt={(x) => x} />
              )}
              {tab === "mileage" && (
                <RangeSelects title="Select a mileage range" from={sel.mileMin} to={sel.mileMax}
                  onFrom={(v) => set({ mileMin: v })} onTo={(v) => set({ mileMax: v })} options={MILE_STEPS} fmt={(x) => Number(x).toLocaleString()} />
              )}
            </div>

            <div className="hs-footer">
              <div className="hs-nav left">
                {prevTab && (
                  <button type="button" onClick={() => setTab(prevTab.id)}>
                    <i className="fas fa-chevron-left"></i> {tab === "body" ? "Select Model" : prevTab.next}
                  </button>
                )}
              </div>
              <button type="button" className="hs-go" onClick={runSearch}>
                Search by these criteria {matches.length ? `(${matches.length.toLocaleString()})` : ""}
              </button>
              <div className="hs-nav right">
                {nextTab && (
                  <button type="button" onClick={() => setTab(nextTab.id)}>
                    {nextTab.next} <i className="fas fa-chevron-right"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}