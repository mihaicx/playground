# Fruit Shop Prototype — Product Requirements Document

## 1. Product overview

**Product:** Fruit Shop Prototype
**Purpose:** Demonstrate a simple online fruit-shopping experience, from browsing a small catalog through a mock checkout.
**Problem:** Shoppers need a clear way to browse fruit, choose quantities, review a cart, and see an order summary.
**Product concept:** A static, client-side web app with four navigable pages and a sample catalog of ten fruit products.

## 2. Goals and non-goals

### Goals

- Demonstrate the basic shopping flow: browse products, view a product, add it to the cart, update or remove cart items, and review a checkout summary.
- Provide simple navigation between Products, ProductDetails, ShoppingCart, and Checkout.
- Use a small, clearly defined sample dataset and basic styling.
- Make the interface usable on desktop and phone-sized screens.

### Non-goals

- User accounts, authentication, or customer data collection.
- A backend, database, inventory service, or external API.
- Real payment processing, order submission, shipping, or tax calculation.
- Production-grade design polish or a complete e-commerce feature set.

## 3. Target audience

Online shoppers interested in ordering fruit. For this prototype, users need to be able to understand product prices and units, select quantities, and review their selections before seeing a mock order confirmation.

## 4. Scope and assumptions

- This is a static, client-side prototype built with HTML, CSS, and JavaScript.
- The app uses the sample data in this document; no server or network connection is required.
- Prices are in US dollars (USD). Each product's price is for the unit shown.
- Cart and selected-product state may be held in client-side memory. Persistence across a page reload or browser session is not required.
- “Process Order” displays a local confirmation only. It does not submit an order or charge a payment method; cart contents remain available in the prototype.
- The interface should scale to desktop and phone screens, with basic responsive layout rather than production-level responsive polish.

## 5. Pages and navigation

The app has four pages, accessible from a left-side navigation menu:

| Page | Purpose |
|---|---|
| **Products** | Browse the ten fruit products, choose quantities, and add products to the cart. |
| **ProductDetails** | View the selected product's name, description, unit price, and emoji. |
| **ShoppingCart** | Review, update, and remove products selected for purchase. |
| **Checkout** | Review the purchase summary and process a mock order. |

### Navigation requirements

- The left-side menu provides a link to each of the four pages and identifies the current page.
- Selecting a product on Products opens ProductDetails for that product. ProductDetails provides a clear way back to Products.
- Users can navigate between pages using the menu without losing the current in-memory cart.
- The menu remains on the left on wider screens. Below a viewport width of **300 CSS pixels**, it collapses to show a one- or two-letter abbreviation for each page link, while keeping links distinguishable and usable.
- Navigation and page content must remain usable at desktop and phone widths. Avoid horizontal overflow at narrow widths.

## 6. Use cases and user flows

1. **Browse products:** The shopper opens Products and scans product names, emoji, unit prices, and quantity controls.
2. **Inspect a product:** The shopper selects a product and sees its ProductDetails page, then returns to Products.
3. **Add products:** The shopper chooses a quantity and adds a product. The cart reflects the selected quantity and computed line total.
4. **Manage the cart:** The shopper opens ShoppingCart, changes a product's quantity, or removes it. Cart totals update accordingly.
5. **Review checkout:** The shopper opens Checkout and reviews product names, quantities, line prices, and the total.
6. **Process a mock order:** The shopper selects “Process Order” and sees an on-screen confirmation that no real order or payment was made.

## 7. Feature requirements

### Products

- Display all ten sample products with product name, emoji, price per unit, and a quantity selector.
- Each quantity selector starts at 1 and accepts positive whole numbers.
- Provide an action to add the selected quantity to the cart.
- Provide a way to open the corresponding ProductDetails page.
- Adding a product already in the cart increases its quantity rather than creating a duplicate cart line.
- Show a cart item count or equivalent visible indication of the current cart contents.

### ProductDetails

- Display the selected product's name, description, emoji, and USD price per unit.
- Provide a clear action to return to Products.
- If ProductDetails is opened without a selected product, show a helpful message and a link to Products rather than a blank or broken page.

### ShoppingCart

- Display each cart product's name, quantity, unit price, and line total.
- Let the shopper update each product's quantity to a positive whole number.
- Let the shopper remove a product from the cart.
- Recalculate line totals, cart subtotal, and the displayed cart count after changes.
- When the cart is empty, show an empty-cart message and a way to return to Products.

### Checkout

- Display each product's name, quantity, unit price, and line total, plus the total amount due.
- The total is the sum of the displayed line totals. Do not add tax, shipping, or fees.
- “Process Order” displays a local confirmation and clearly indicates that this is a prototype and no real order or payment was made.
- If the cart is empty, show an empty-cart message and do not present an actionable order-processing control.

## 8. Sample data and data model

Represent each product with a stable ID, name, description, numeric unit price in USD, unit label, and emoji. Use the same product data on Products, ProductDetails, ShoppingCart, and Checkout.

| ID | Product | Description | Price per unit | Emoji |
|---|---|---|---:|:---:|
| apple | Apples | Crisp, sweet apples for snacking or baking. | $1.99 / lb | 🍎 |
| banana | Bananas | Ripe bananas, sold by the bunch. | $1.49 / bunch | 🍌 |
| orange | Oranges | Juicy oranges with a bright, citrus flavor. | $2.49 / lb | 🍊 |
| strawberry | Strawberries | Sweet, fresh strawberries. | $3.99 / 1 lb box | 🍓 |
| grapes | Grapes | Seedless grapes, ready to enjoy. | $2.99 / lb | 🍇 |
| watermelon | Watermelon | Refreshing watermelon, sold individually. | $5.99 / each | 🍉 |
| pineapple | Pineapple | Golden pineapple with a tropical flavor. | $3.49 / each | 🍍 |
| mango | Mangoes | Sweet mangoes with soft, juicy flesh. | $1.79 / each | 🥭 |
| lemon | Lemons | Tart lemons for drinks, cooking, or baking. | $0.79 / each | 🍋 |
| peach | Peaches | Fragrant, tender peaches. | $2.99 / lb | 🍑 |

Cart entries reference a product by ID and store its selected quantity. Calculate line totals from the product's unit price and quantity. Display currency consistently in USD to two decimal places.

## 9. UI, styling, and accessibility

- Use a clean, friendly visual style appropriate for a fruit shop, with clear page headings, readable text, and distinct buttons and links.
- Use emoji as the product imagery; external image assets are not required.
- Use a flexible layout that adapts to available screen width. Keep content readable and controls usable on desktop and phone screens without requiring polished breakpoint-specific styling.
- Apply the specified abbreviated left navigation below 300 CSS pixels.
- Use semantic headings, buttons, links, and form controls. Associate quantity labels with their inputs, preserve visible keyboard focus, and provide text labels so meaning does not depend on emoji or color alone.
- Show clear feedback after adding to cart, removing a product, and processing a mock order.

## 10. Technical requirements

- Use plain HTML, CSS, and JavaScript for a client-side web app; do not require a framework, build system, backend, or external service.
- Keep product data in a simple local JavaScript dataset or equivalent static client-side representation.
- Implement navigation so each of the four pages can be opened from the menu. A lightweight client-side page/view switch is sufficient.
- Keep cart and selected-product data consistent across page navigation during the current app session.
- Use numeric currency values for calculations and format displayed prices as USD with two decimal places.
- The prototype should run locally in a modern browser by opening or serving its static files; no account or configuration is required.

## 11. Acceptance criteria

- [ ] Products displays exactly ten fruit products, each with a name, description in the dataset, emoji, unit price, and quantity selection.
- [ ] The menu provides working navigation to Products, ProductDetails, ShoppingCart, and Checkout.
- [ ] Selecting a product opens its details; returning to Products works. Opening details without a selection produces a helpful fallback.
- [ ] Adding a selected quantity updates the cart count and cart contents. Adding the same product again increments its existing quantity.
- [ ] ShoppingCart shows quantity and correct line total for each item; changing a quantity or removing an item updates the cart count and totals.
- [ ] The empty cart has a helpful message and a route back to Products.
- [ ] Checkout shows the cart's products, quantities, line totals, and correct total, with no added tax or shipping.
- [ ] Processing a non-empty cart shows a mock confirmation and does not imply a real order or payment. Processing is unavailable for an empty cart.
- [ ] The layout remains usable at desktop and phone widths, avoids horizontal overflow at narrow widths, and the menu uses one- or two-letter page abbreviations below 300 CSS pixels.
- [ ] Product and cart controls have text labels and can be reached and operated with a keyboard.

## 12. Out of scope and future ideas

The following are explicitly out of scope for this prototype and should not be implemented unless requested later:

- Authentication, customer profiles, or saved addresses.
- Real checkout, payment processing, or order fulfillment.
- Backend APIs, database integration, or inventory management.
- Tax, shipping, discounts, or promotion calculations.
- Product search, filtering, reviews, and account order history.
- Persisting cart data across browser reloads or sessions.
