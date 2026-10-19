import { useEffect, useRef, useState } from 'react';
import { CURRENCIES, useCurrency } from '../lib/CurrencyContext';
import '../styles/currency.css';

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="cs" ref={ref}>
      <button
        type="button"
        className="cs-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="cs-symbol">{CURRENCIES[currency].symbol}</span>
        <span>{currency}</span>
        <svg className={`cs-chev${open ? ' open' : ''}`} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className="cs-menu" role="listbox">
          {Object.entries(CURRENCIES).map(([code, { symbol, name }]) => (
            <li key={code} role="option" aria-selected={code === currency}>
              <button
                type="button"
                className={code === currency ? 'active' : ''}
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                }}
              >
                <span className="cs-symbol">{symbol}</span>
                <span className="cs-code">{code}</span>
                <span className="cs-name">{name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}