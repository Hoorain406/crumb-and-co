# Frontend Decisions — Crumb & Co.

## Decision 1 — Improve Product Presentation and Information Hierarchy

**Reference Website:** Starbucks  
**URL:** https://www.starbucks.com/menu

**Problem Observed:**  
During the investigation of Starbucks' menu, product images appeared excessively large, occupying considerable screen space. Individual product descriptions were also missing from the menu listing.

**Decision:**  
Crumb & Co. uses a structured product-card layout with appropriately sized images, product names, prices and short descriptions. This allows customers to understand and compare products directly from the menu page.

**Alternative Considered:**  
Displaying large product images with minimal information and requiring customers to open individual product pages to understand each product.

**Reason for Decision:**  
Providing product descriptions alongside appropriately sized images improves menu readability and helps customers make quicker purchasing decisions.

**Trade-off:**  
Displaying additional product information requires careful spacing and layout management, particularly on smaller mobile screens.

**Code Location:**
- `src/pages/Menu.jsx`
- `src/components/MenuCard.jsx`
- `src/styles.css`

---

## Decision 2 — Display Stock Availability and Enforce Quantity Limits

**Reference Website:** Panera Bread  
**URL:** https://www.panerabread.com/

**Problem Observed:**  
During the investigation of Panera Bread's ordering experience, the remaining stock quantity of individual products was not clearly communicated. Customers could not easily determine how many units were available.

**Decision:**  
Crumb & Co. displays product stock information and enforces availability restrictions when customers add products to their cart. Customers cannot order more than the available stock or exceed the maximum limit of six units per item.

**Alternative Considered:**  
Displaying products without stock information and informing customers about availability restrictions only after they attempt to place an order.

**Reason for Decision:**  
Showing stock information before checkout improves transparency and helps customers select quantities that can actually be fulfilled.

**Trade-off:**  
Stock information must remain consistent across product details, cart updates and checkout validation.

**Code Location:**
- `src/data/menu.js`
- `src/pages/ItemDetails.jsx`
- `src/context/CartContext.jsx`
- `src/utils/businessRules.js`

---

## Decision 3 — Communicate Pickup Timing and Fulfilment Conditions

**Reference Website:** Greggs  
**URL:** https://www.greggs.co.uk/

**Problem Observed:**  
During the investigation of Greggs' website, pickup and delivery time information was not clearly communicated in the ordering experience being reviewed. Customers could not easily determine when their orders would be available.

**Decision:**  
Crumb & Co. clearly communicates its pickup-time requirement beside the pickup field during checkout. Customers must select a pickup time at least 30 minutes after placing their order. The application validates the selected time before accepting the order.

**Alternative Considered:**  
Allowing customers to select any pickup time and displaying fulfilment restrictions only after order submission.

**Reason for Decision:**  
Communicating pickup conditions before submission helps customers plan their orders and prevents invalid pickup selections.

**Trade-off:**  
The checkout form requires additional instructions and time validation, making the form slightly more detailed.

**Code Location:**
- `src/pages/Checkout.jsx`
- `src/utils/businessRules.js`

---

## Summary of Frontend Decisions

| Reference Website | Identified Problem | Crumb & Co. Solution |
|---|---|---|
| Starbucks | Oversized product images and missing descriptions | Balanced product cards with descriptions and prices |
| Panera Bread | Stock availability information not clearly displayed | Visible stock quantities and enforced order limits |
| Greggs | Pickup and delivery timing information not clearly communicated | Clear pickup instructions and 30-minute validation |

These decisions demonstrate how the reference-site investigation informed the design and implementation of Crumb & Co.'s customer ordering experience.