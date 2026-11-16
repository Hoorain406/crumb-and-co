export const MAX_ORDER_QUANTITY = 6;
export const MIN_PICKUP_LEAD_MINUTES = 30;

export function checkStock(item, quantity) {
  if (!item || !Number.isInteger(quantity) || quantity < 1) {
    return { valid: false, message: 'Choose a valid quantity.' };
  }
  if (quantity > item.stock) {
    return { valid: false, message: `Only ${item.stock} ${item.name} available.` };
  }
  if (quantity > MAX_ORDER_QUANTITY) {
    return { valid: false, message: `You can order up to ${MAX_ORDER_QUANTITY} of one item.` };
  }
  return { valid: true, message: 'Available.' };
}

export function checkCustomization(item, milkChoice) {
  if (!item?.customizable && milkChoice && milkChoice !== 'Regular milk') {
    return { valid: false, message: 'Milk alternatives are only available for selected drinks.' };
  }
  return { valid: true, message: 'Customization accepted.' };
}

export function checkPickupTime(pickupValue, now = new Date()) {
  if (!pickupValue) return { valid: false, message: 'Choose a pickup time.' };
  const pickup = new Date(pickupValue);
  if (Number.isNaN(pickup.getTime())) return { valid: false, message: 'Enter a valid pickup time.' };
  const earliest = new Date(now.getTime() + MIN_PICKUP_LEAD_MINUTES * 60 * 1000);
  if (pickup < earliest) return { valid: false, message: 'Pickup must be at least 30 minutes from now.' };
  return { valid: true, message: 'Pickup time accepted.' };
}
