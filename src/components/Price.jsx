import { useCurrency } from '../lib/CurrencyContext';

// Use: <Price usd={car.price} />
export default function Price({ usd, className }) {
  const { formatPrice } = useCurrency();
  return (
    <span className={className} data-price-usd={usd}>
      {formatPrice(usd)}
    </span>
  );
}