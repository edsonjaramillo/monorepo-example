import { describe, expect, test } from 'vitest';

import { Expiration } from '../src/datetime/Expiration';

describe('Basic functionality', () => {
  test('Expiration.getSeconds', () => {
    expect(Expiration.getSeconds(5)).toBe(5);
  });

  test('Expiration.getMinutes', () => {
    expect(Expiration.getMinutes(15)).toBe(900);
  });

  test('Expiration.getHours', () => {
    expect(Expiration.getHours(4)).toBe(14400);
  });

  test('Expiration.getDays', () => {
    expect(Expiration.getDays(3)).toBe(259200);
  });
});

describe('Error handling', () => {
  test('Expiration.getSeconds', () => {
    expect(() => Expiration.getSeconds(-1)).toThrow();
  });

  test('Expiration.getMinutes', () => {
    expect(() => Expiration.getMinutes(-1)).toThrow();
  });

  test('Expiration.getHours', () => {
    expect(() => Expiration.getHours(-1)).toThrow();
  });

  test('Expiration.getDays', () => {
    expect(() => Expiration.getDays(-1)).toThrow();
  });
});
