# Bill-splitting web app design

## Direction

Create a premium, elegant web application for use in a browser. Design for desktop and laptop screens first, with a layout that adapts gracefully to narrower browser windows. Keep the experience calm, clear, and focused on the bill.

## Visual principles

- Use a restrained color palette, generous whitespace, subtle borders, and considered typography.
- Make amounts and the next action immediately visible.
- Use clear labels and familiar controls; avoid making people learn financial terminology.
- Use color as a supporting cue, not the only way to communicate a state.
- Present Arabic and English as equally complete experiences, including right-to-left layout for Arabic.
- Final colors, typefaces, and branding remain open until the app name and visual references are selected.

## Proposed screens

### Dashboard

Show a prominent action to create a bill, recent bills, and a concise view of outstanding balances. Provide a useful empty state for a first-time guest.

### Create and edit bill

Use a spacious desktop layout with the bill details and items in the main area and participants, payer, and a running total in a secondary panel. Offer clear choices for entering a total, adding items, or scanning a receipt.

### Review receipt

Display the receipt alongside editable extracted items and charges. Make it easy to correct names, amounts, missing items, and the total before proceeding. Provide manual entry if scanning fails.

### Split the bill

Offer equal and item-based splitting. In item mode, make each item's assigned participants visible and allow several people to share it. Show how charges and discounts affect the totals.

### Results and sharing

Show the payer, each person's share, and how much each other person owes. Include a detailed breakdown and options to share a link or QR code. Make clear that the app calculates amounts rather than transferring money.

### History and balances

List past outings with their date, total, and participants. Provide a view of balances across outings, subject to the decisions about friend identity and payment status.

## Interaction and accessibility

- Keep the primary action consistent and provide feedback when changes are saved or an error occurs.
- Confirm the calculation before finalizing and allow correction of entered or scanned values.
- Support keyboard navigation, visible focus, readable contrast, and descriptive labels.
- Adapt the layout for narrower windows without removing essential functions.
- Mirror layout and navigation appropriately in Arabic; keep numbers and currency amounts readable.

## Open design questions

- App name, logo, colors, and typography.
- How shared-link access and editing permissions are communicated.
- How guests recover saved bills and recognize friends across outings.
- Whether payment status appears in the first release.
