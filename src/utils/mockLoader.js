import { menuItems } from '../data/menu.js';

export function loadMenu() {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      const shouldFail = sessionStorage.getItem('crumb-demo-load-failure') === 'true';
      if (shouldFail) reject(new Error('The menu could not be loaded. Please try again.'));
      else resolve(menuItems);
    }, 450);
  });
}
