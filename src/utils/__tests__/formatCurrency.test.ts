import { formatCurrency } from '../formatCurrency';

// Test suite for formatCurrency function
describe('formatCurrency', () => {
  // Test case for formatting a positive number
  it('should format a positive number correctly', () => {
    const result = formatCurrency(123.45);

    expect(result).toBe('$123.45');
  });

  // Test case for formatting a negative number
  it('should format a negative number correctly', () => {
    const result = formatCurrency(-123.45);

    expect(result).toBe('-$123.45');
  });

  // Test case for formatting zero
  it('should format zero correctly', () => {
    const result = formatCurrency(0);

    expect(result).toBe('$0.00');
  });

  // Test case for formatting a large number
  it('should format a large number correctly', () => {
    const result = formatCurrency(1234567890.12);

    expect(result).toBe('$1,234,567,890.12');
  });

  // Test case for formatting a number with a fractional part
  it('should format a number with a fractional part correctly', () => {
    const result = formatCurrency(1234567890.123456);

    expect(result).toBe('$1,234,567,890.12');
  });

  // Test case for formatting a number with a fractional part
  it('should format a number with a fractional part correctly', () => {
    const result = formatCurrency(1234567890.123456);

    expect(result).toBe('$1,234,567,890.12');
  });
});
