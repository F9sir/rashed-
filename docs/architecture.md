# Architecture

## Purpose and scope

Build a desktop-first browser application for splitting restaurant and café bills. The first release supports guest use, Arabic and English, Bahraini dinar, equal and item-based splits, receipt entry, sharing, and bill history. See `plan.md` for product rules and `design.md` for the visual direction.

## Technology

- **Framework:** Next.js with the App Router and React.
- **Language:** JavaScript and JSX, producing semantic HTML.
- **Styling:** Tailwind CSS for layout and design tokens, with CSS for global styles and cases better expressed outside utilities.
- **Runtime:** Next.js server for shared data and server-side operations; browser-side React for interactive bill editing.
- **Storage and receipt recognition:** providers are not yet selected. Keep them behind service interfaces until requirements and costs are agreed.

## System overview

```text
Browser (Next.js / React)
  ├─ Guest bill editor and results
  ├─ Arabic / English interface
  └─ Shared calculation logic
          │ HTTPS
Next.js server
  ├─ Shared bill and history operations
  ├─ Validate inputs and access permissions
  ├─ Receipt recognition adapter
  └─ Storage adapter
          │
  Database / receipt provider (to be selected)
```

Shared links and cross-device history require server-side persistent storage; browser-only storage cannot provide these capabilities. Receipt scanning requires an OCR service or library, with user review and correction before calculations are finalized.

## Application structure

```text
app/                 Routes, layouts, and server endpoints
components/          Reusable interface components
features/bills/      Bill editing, splitting, and results
features/receipts/   Upload, recognition, and review
features/history/    Saved bills and balances
lib/calculations/    Pure money and split functions
lib/data/            Storage interfaces and implementations
lib/i18n/            Translations and locale helpers
lib/validation/      Shared input validation
```

This is a proposed structure, to be adjusted to the implementation rather than creating empty folders in advance.

## Data model

- **Bill:** identifier, date, currency, payer, status, participants, items, and adjustments.
- **Participant:** bill-specific identifier and display name; any persistent friend identity is subject to a product decision.
- **Item:** name, price in fils, and assigned participant identifiers.
- **Adjustment:** type and amount in fils for tax, service, tip, or discount.
- **Share:** calculated per participant from bill data; avoid storing a second authoritative total that can drift out of sync.
- **Access:** shared-link and creator credentials or permissions, to be designed after edit and recovery rules are decided.

History and cross-outing balances depend on durable storage and a decision on how friends are recognized across bills. Payment status remains undecided; do not infer that a calculated amount has been paid.

## Calculation boundary

Implement pure JavaScript functions independent of React and storage. Use integer fils, divide shared items among assigned participants, and divide adjustments equally among bill participants. Allocate rounding remainders deterministically so shares sum exactly to the final total. Validate totals and assignments, reject invalid values, and test examples including discounts, shared items, and rounding. The server must validate inputs and recalculate authoritative results for saved or shared bills.

## Rendering and performance

- Use server components for suitable page structure and data fetching; use client components for bill editing and interactive controls.
- Fetch independent server data in parallel, avoid unnecessary request chains, and send only required data to the browser.
- Load receipt scanning and other heavy functionality only when needed.
- Keep transient form state close to the relevant components; derive totals from bill state rather than synchronizing duplicate state through effects.
- Avoid premature memoization and measure performance before adding complexity.

## Design and accessibility

Use Tailwind to implement a consistent, deliberate visual system: restrained colors, clear type hierarchy, and generous desktop spacing. Define final palette and typography when the visual direction is selected. Use semantic HTML, keyboard-accessible controls, visible focus, readable contrast, and reduced-motion support. Set language and text direction correctly and use logical spacing and alignment for Arabic and English.

## Security and reliability

Validate bill and receipt inputs on the server. Treat private share URLs as access credentials, avoid exposing them in logs, and establish edit permissions and revocation rules before implementation. Limit and validate receipt uploads; decide retention and deletion policies with the selected provider. Handle failed saves and scanning errors with clear recovery paths.

## Open decisions

Storage provider and guest recovery; friend identity across bills; shared-link permissions and expiry; payment-status tracking; receipt recognition provider and retention; deployment target; and final brand direction. These choices affect the implementation and should be resolved before their dependent features are built.

## Provisional core calculation decisions

For the initial local editor, the entered total is a subtotal before separately entered adjustments. Reject a discount if it would make any participant’s share negative. These defaults can be revisited before persistence is implemented. “Maida” is a provisional working name.

## Provisional storage and sharing implementation

The local implementation uses SQLite on a single persistent Node.js server (`MAIDA_DATA_DIR` or `.data/`). Owner credentials and explicit cross-bill identity labels live in the owner's browser; clearing browser data loses access and identity matches. There is no account or recovery mechanism. A share link is a bearer credential: it permits viewing and joining for seven days; only the owner can edit or revoke it. Replacing a link revokes the previous link. The owner must reopen a bill after a guest joins; version checks reject stale saves. Guest joining does not assign items. Balance labels are manually matched and correctable; amounts are gross debts with no payment tracking or netting. These are provisional product and hosting choices, not a selected production provider. Localhost links are not accessible to other devices without a reachable server address.
