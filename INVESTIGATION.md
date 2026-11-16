Reference Website Usability Investigation — Crumb & Co.

Investigation 1 — Starbucks

Website: https://www.starbucks.com/menu

Affected task: Browsing the menu and identifying individual products.

Observed problem:
During inspection of the Starbucks menu, product images appeared excessively large, taking up substantial screen space. Individual product descriptions were also not provided alongside the menu listings.

User consequence:
Customers may have difficulty comparing several products efficiently. Without short descriptions, they may need to open individual product pages to understand what each item contains.

Business consequence:
A less efficient browsing experience may increase the effort required to select products and make comparisons.

How Crumb & Co. addresses this:
Crumb & Co. uses a consistent product-card layout with controlled image dimensions, product names, prices and descriptions. This allows customers to compare menu items without opening every individual details page.

Evidence:

Reference screenshot: [Insert Starbucks menu screenshot]

Implementation screenshot: [Insert Crumb & Co. menu screenshot]

Relevant code: src/pages/Menu.jsx, src/components/MenuCard.jsx, src/styles.css

Investigation 2 — Panera Bread

Website: https://www.panerabread.com/

Affected task: Checking product availability before adding items to an order.

Observed problem:
During inspection, the menu did not communicate how many units of a particular product remained in stock. Stock quantity and availability information were not clearly visible to the customer.

User consequence:
Customers may select products without knowing whether the desired quantity is available, potentially creating uncertainty during ordering.

Business consequence:
Unclear availability information can lead to unsuccessful ordering attempts and customer frustration.

How Crumb & Co. addresses this:
Crumb & Co. displays stock information on product details and enforces availability limits when customers add products to their cart. Customers cannot exceed available stock or the maximum quantity of six units per item.

Evidence:

Reference screenshot: [Insert Panera Bread screenshot]

Implementation screenshot: [Insert Crumb & Co. stock information screenshot]

Relevant code: src/pages/ItemDetails.jsx, src/utils/businessRules.js

Investigation 3 — Greggs

Website: https://www.greggs.co.uk/

Affected task: Understanding order fulfilment and planning when to receive an order.

Observed problem:
During inspection, pickup and delivery time information was not clearly available in the ordering experience being reviewed.

User consequence:
Customers may find it difficult to determine when their order can be collected or delivered before completing the ordering journey.

Business consequence:
Unclear fulfilment information may create uncertainty and reduce customer confidence when placing an order.

How Crumb & Co. addresses this:
Crumb & Co. communicates its pickup requirement beside the pickup-time field. Customers must select a pickup time at least 30 minutes after placing the order. The application validates this condition before accepting the order.

Evidence:

Reference screenshot: [Insert Greggs screenshot]

Implementation screenshot: [Insert Crumb & Co. checkout screenshot]

Relevant code: src/pages/Checkout.jsx, src/utils/businessRules.js

Overall Findings

The three investigations identified different areas of the customer ordering experience:

Product presentation and information hierarchy.

Product availability transparency.

Fulfilment-time communication.

Crumb & Co. addresses these areas through readable product cards, visible stock information, quantity validation and clear pickup-time requirements.

Research limitation: The observations represent the pages and ordering experiences inspected during this investigation. They should not be interpreted as claims about every page, device or ordering channel operated by the reference businesses.