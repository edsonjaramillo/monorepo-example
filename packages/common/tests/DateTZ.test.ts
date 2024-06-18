import { describe, expect, test } from 'vitest';

import { DateTZ, DateTZFromInput, formatDatetimeTZ } from '../src/datetime/DateTZ';

describe('DateTZFromInput', () => {
  test('DateTZFromInput - valid datetime string', async () => {
    expect(DateTZFromInput('2024-01-01T23:59').format('YYYY-MM-DD HH:mm')).toBe('2024-01-01 23:59');
  });

  test('DateTZFromInput - invalid datetime string', () => {
    expect(() => DateTZFromInput('invalid datetime string')).toThrow();
  });

  test('DateTZFromInput - datetime string without time', () => {
    expect(() => DateTZFromInput('2024-01-01')).toThrow();
  });

  test('DateTZFromInput - datetime string with invalid time', () => {
    expect(() => DateTZFromInput('2024-01-01T25:00')).toThrow();
  });
});

describe('DateTZ', () => {
  test('DateTZ - date string', () => {
    expect(DateTZ('2024-01-01').format('YYYY-MM-DD')).toBe('2024-01-01');
  });

  test('DateTZ - date object', () => {
    const date = new Date('2024-01-01T00:00:00');
    expect(DateTZ(date).format('YYYY-MM-DD HH:mm:ss')).toBe('2024-01-01 00:00:00');
  });

  test('DateTZ - Day.js object', () => {
    expect(DateTZ(DateTZ('2024-01-01')).format('YYYY-MM-DD')).toBe('2024-01-01');
  });

  test('DateTZ - number', () => {
    expect(DateTZ(1704131940000).format('YYYY-MM-DD')).toBe('2024-01-01');
  });
});

describe('DateTZ - format', () => {
  test('formatDatetimeTZ - default format', () => {
    expect(formatDatetimeTZ('2024-01-01T23:59')).toBe('Mon, Jan 1, 2024, 11:59 PM CST');
  });
});
