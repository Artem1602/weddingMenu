export function parsePrice(price: string): number {
  return Number.parseFloat(price.replace(' грн', '').trim()) || 0;
}
export function parseWeight(value: string): number {
  if (!value) return 0;
  const normalized = value.replace(/\s+/g, '');
  const parts = normalized.split('-').map((p) => Number.parseFloat(p));
  const numbers = parts.filter((n) => Number.isFinite(n));
  if (!numbers.length) return 0;
  if (numbers.length === 1) return numbers[0];      // “250”
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length; // “200-300” => 250
}
