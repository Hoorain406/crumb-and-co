import test from 'node:test';
import assert from 'node:assert/strict';
import { checkStock, checkCustomization, checkPickupTime } from '../src/utils/businessRules.js';

const cappuccino = { id: 'coffee-01', name: 'Classic Cappuccino', stock: 12, customizable: true };
const croissant = { id: 'bakery-01', name: 'Butter Croissant', stock: 9, customizable: false };

test('stock rule accepts an ordinary valid quantity', () => {
  assert.equal(checkStock(cappuccino, 2).valid, true);
});

test('stock rule accepts exactly six units', () => {
  assert.equal(checkStock(cappuccino, 6).valid, true);
});

test('stock rule rejects a quantity above six', () => {
  assert.equal(checkStock(cappuccino, 7).valid, false);
});

test('stock rule rejects quantities above available stock', () => {
  assert.equal(checkStock(croissant, 10).valid, false);
});

test('milk alternative is rejected for bakery items', () => {
  assert.equal(checkCustomization(croissant, 'Oat milk').valid, false);
});

test('milk alternative is accepted for eligible drinks', () => {
  assert.equal(checkCustomization(cappuccino, 'Oat milk').valid, true);
});

test('pickup time must be at least thirty minutes ahead', () => {
  const now = new Date('2026-11-14T10:00:00');
  assert.equal(checkPickupTime('2026-11-14T10:30', now).valid, true);
  assert.equal(checkPickupTime('2026-11-14T10:29', now).valid, false);
});
