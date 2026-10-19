import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar' },
  JPY: { symbol: '¥', name: 'Japanese Yen' },
  GBP: { symbol: '£', name: 'British Pound' },
  EUR: { symbol: '€', name: 'Euro' },
};

const FALLBACK_RATES = { USD: 1, JPY: 150, GBP: 0.78, EUR: 0.92 };
const CURRENCY_KEY = 'bba_currency';
const RATES_KEY = 'bba_rates_v1';
const RATES_TTL = 6 * 60 * 60 * 1000;
const RATES_URL = 'https://api.frankfurter.dev/v1/latest?base=USD&symbols=JPY,GBP,EUR';

const CurrencyContext = createContext(null);

function readCachedRates() {
  try {
    const raw = JSON.parse(localStorage.getItem(RATES_KEY));
    if (raw && raw.rates) return raw;
  } catch {}
  return null;
}

function formatMoney(amount, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => {
    try {
      const saved = localStorage.getItem(CURRENCY_KEY);
      return CURRENCIES[saved] ? saved : 'USD';
    } catch {
      return 'USD';
    }
  });

  const [rates, setRates] = useState(() => {
    const cached = readCachedRates();
    return cached ? { USD: 1, ...cached.rates } : FALLBACK_RATES;
  });

  useEffect(() => {
    const cached = readCachedRates();
    if (cached && Date.now() - cached.time < RATES_TTL) return;
    let cancelled = false;
    fetch(RATES_URL)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || !data.rates) return;
        setRates({ USD: 1, ...data.rates });
        try {
          localStorage.setItem(RATES_KEY, JSON.stringify({ time: Date.now(), rates: data.rates }));
        } catch {}
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const setCurrency = useCallback((code) => {
    if (!CURRENCIES[code]) return;
    setCurrencyState(code);
    try { localStorage.setItem(CURRENCY_KEY, code); } catch {}
  }, []);

  const formatPrice = useCallback(
    (usd) => {
      const n = Number(usd);
      if (!Number.isFinite(n)) return '';
      return formatMoney(n * (rates[currency] ?? 1), currency);
    },
    [rates, currency]
  );

  // data-price-usd wale saare elements ko update karta hai (vanilla JS wali prices ke liye)
  useEffect(() => {
    document.documentElement.dataset.currency = currency;

    const apply = () => {
      document.querySelectorAll('[data-price-usd]').forEach((el) => {
        const text = formatPrice(el.getAttribute('data-price-usd'));
        if (text && el.textContent !== text) el.textContent = text;
      });
    };

    let frame = 0;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        observer.disconnect();
        apply();
        observe();
      });
    });
    const observe = () =>
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-price-usd'],
      });

    apply();
    observe();

    window.formatPrice = formatPrice;
    window.dispatchEvent(new CustomEvent('currencychange', { detail: { currency } }));

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [currency, formatPrice]);

  const value = useMemo(
    () => ({ currency, setCurrency, formatPrice, rates }),
    [currency, setCurrency, formatPrice, rates]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used inside <CurrencyProvider>');
  return ctx;
}