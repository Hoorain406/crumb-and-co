# Crumb & Co. — CS4032 Assignment 02

A responsive frontend for a fictional neighbourhood café and bakery in Islamabad. Customers can browse 12 local menu records, search and filter items, view item details, build an order, enter pickup details, review a calculated total and receive a simulated confirmation.

> **Project scope:** This is a frontend-only university assignment. Orders are simulated. No payment is collected and no order is sent to a real business. The project does not use an external API, external database, authentication provider, image service, payment service, UI kit or CSS framework.

## Technology

- HTML5, authored CSS and JavaScript
- React and React DOM
- React Router DOM for client-side routes
- Vite and `@vitejs/plugin-react` for local development and production builds
- Node.js built-in `node:test` and `node:assert/strict` for business-rule tests

React Router DOM is permitted by the assignment. Vite is the development/build tool. No additional UI component library is used.

## Requirements

Use Node.js and npm. From this project folder run:

```bash
npm install
npm run dev
```

Open the local address printed by Vite. To create a production build:

```bash
npm run build
npm run preview
```

Run automated business-rule tests:

```bash
node --test
```

`npm install` creates `package-lock.json`. Include that generated lockfile in the final repository and submission ZIP as required by the assignment. Do not include `node_modules/` or `dist/` in the submitted ZIP.

## Business profile

- **Business:** Crumb & Co.
- **Offering:** Coffee, tea, bakery items, sandwiches and desserts.
- **Audience:** People in Islamabad looking for a simple café pickup order.
- **Operating area:** Islamabad (fictional business; no actual pickup location is represented).
- **Main customer task:** Browse the menu, choose items and quantities, provide pickup details, review the total and receive a simulated order confirmation.
- **Business goal:** Help a customer complete a clear, low-friction pickup-order journey.

## Main routes

| Route | Purpose |
|---|---|
| `/` | Home page and introduction |
| `/menu` | Search, category filters, sorting and menu listing |
| `/items/:id` | Menu item details and selection |
| `/cart` | Review, change quantities and remove selected items |
| `/checkout` | Controlled pickup form and calculated order summary |
| `/confirmation` | Simulated order outcome |
| `/our-story` | Business profile |

Invalid item IDs show a useful not-found message. Unknown routes show a not-found page.

## Local data and assets

- `src/data/menu.js` contains 12 menu items with stable IDs, descriptions, categories, prices and stock quantities.
- `public/images/` contains original local SVG illustrations. No remote image URLs are required.
- `src/utils/mockLoader.js` simulates asynchronous menu loading and a recoverable loading failure.
- Cart data and the latest simulated order are stored in browser `localStorage`.

## Three operating rules

1. **Availability/capacity — stock and per-item quantity:** A customer cannot order more than the available stock or more than six units of one menu item. The stock and limit are shown on item details. Invalid quantities are rejected with a specific message. Boundary: exactly six is accepted when stock is at least six; seven is rejected.
2. **Eligibility/compatibility — drink customizations:** Oat and almond milk choices are offered only for menu items marked as customizable drinks. Bakery, food and dessert items use standard preparation. An incompatible choice is rejected. Boundary: choosing an alternative milk for a non-customizable item is invalid.
3. **Fulfilment — pickup lead time:** Pickup must be at least 30 minutes after the order is placed. The rule is explained beside the pickup field and checked again on submission. Boundary: exactly 30 minutes ahead is accepted; 29 minutes is rejected.

The stock rule is exported from `src/utils/businessRules.js` and is used by the application and automated tests.

## Edge-case demonstration

On the Menu page, open **Assignment testing controls**:

- **Simulate menu loading failure:** forces the mock loader to fail. The page shows an error and a retry action. Turn the failure off and retry to restore the menu.
- **Mark butter croissant sold out:** changes the available stock to zero for the current app session. The item shows as unavailable and cannot be added. Use the restore control to return its stock.

Other checks: search for a phrase with no results, open `/items/not-a-real-id`, enter an invalid phone number, choose a pickup time less than 30 minutes ahead, and try a quantity above six. To test a restored selection, add the Butter Croissant to your cart, mark it sold out, verify that checkout is blocked, then restore availability and confirm that the cart can proceed again.

## Testing

Run `node --test`. The test file checks valid stock quantity, the exact six-unit limit, a quantity above the limit, stock exhaustion, customization compatibility and the pickup-time boundary.

Record the actual test output and browser checks in the assignment report after running the application locally. Check the project at approximately 390px and 1280px widths, using keyboard navigation and the browser console.

## GitHub and deployment checklist

GitHub development history and deployment are compulsory assignment tasks; they cannot be completed by a source ZIP alone.

1. Create a public GitHub repository at the beginning of development.
2. Commit meaningful stages as you implement and test the project. Do not fabricate or backdate commits.
3. Deploy the completed project using a suitable hosting service.
4. Verify the public URL, assets, main journey and direct refreshes on nested routes.
5. Record the repository URL, deployment URL and final commit hash in the report and final README.

## Reference-site investigation and limitations

The assignment requires evidence from real reference websites for three different usability problems. Do not present assumptions as observed facts. Complete `INVESTIGATION.md` after personally inspecting the reference sites and capturing screenshots. Then update `DECISIONS.md` with the three evidence-based decisions and exact code locations.

This project is a frontend demonstration only. It does not provide a real kitchen inventory, live ordering, customer accounts, payments, delivery, email/SMS notifications or a backend. The café and its menu are fictional.

## Concept map

| React / JavaScript concept | File or location |
|---|---|
| Function components and JSX | `src/components/`, `src/pages/` |
| Props and callback props | `Menu.jsx`, `MenuCard.jsx` |
| Controlled inputs and form validation | `src/pages/Checkout.jsx` |
| Shared state and Context API | `src/context/CartContext.jsx` |
| Functional state updates and immutable arrays | `CartContext.jsx` |
| Derived count and total | `CartContext.jsx` |
| Effects and browser persistence | `CartContext.jsx`, `App.jsx` |
| Routing and URL parameters | `src/App.jsx`, `ItemDetails.jsx` |
| Async loading and error recovery | `src/utils/mockLoader.js`, `App.jsx` |
| Business rules | `src/utils/businessRules.js` |
| Built-in tests | `tests/businessRules.test.js` |
