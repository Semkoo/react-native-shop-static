/**
 * Format a number to a currency string
 * @param amount - The amount to format
 * @param currency - The currency code (e.g., 'CAD', 'USD', 'EUR', 'JPY', default is CAD)
 * @param locale - The locale to use for formatting (defaults to 'en-CA')
 * @returns The formatted currency string
 */
export const formatCurrency = (
  amount: number | string,
  currency: string = 'CAD',
  locale: string = 'en-CA'
) => {
  if (typeof amount === 'string') {
    const parsed = Number(amount);
    if (isNaN(parsed)) return 'N/A';
    amount = parsed;
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * formatCurrency(1234.56, 'USD')          // "$1,234.56"
 * formatCurrency(1234.56, 'CAD')          // "$1,234.56"
 * formatCurrency(1234.56, 'EUR', 'de-DE') // "1.234,56 €"
 * formatCurrency(1234.56, 'JPY', 'ja-JP') // "￥1,235"
 */
