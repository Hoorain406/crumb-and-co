# Crumb & Co. — Project Plan

## Business
A fictional café and bakery in Islamabad offering coffee, tea, pastries, sandwiches and desserts. The website supports a simulated pickup order.

## Main journey
Home → menu discovery → item details → cart → pickup form → calculated summary → simulated confirmation.

## Scope boundaries
Frontend only. Local menu data, local SVG assets, React state, localStorage and simulated asynchronous loading. No login, real order transmission, payment, delivery, remote database, external API or UI kit.

## Operating rules
1. Availability: available stock and a maximum of six units per menu item.
2. Eligibility: alternative milk customizations only for marked drinks.
3. Fulfilment: pickup at least 30 minutes after order placement.

## Build stages
1. Create React/Vite project and local data.
2. Build responsive layout, navigation, home and menu.
3. Add item details, search, filters and sorting.
4. Add shared cart state, persistence and quantity controls.
5. Add validated pickup form, summary and simulated confirmation.
6. Add loading/error recovery, availability demo and business-rule tests.
7. Investigate three reference-site problems, document decisions, test responsive layouts, create GitHub history and deploy.

## Final verification
Check the full customer journey, invalid item URL, empty search, invalid phone, pickup-time boundary, stock boundary, changed availability, loading failure/retry, localStorage restoration, keyboard access and layouts at 390px and 1280px.
