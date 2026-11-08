# Project guidance

## Product

This project is a browser-based bill-splitting app for the owner and their friends, initially focused on restaurants and cafés. Read `plan.md`, `design.md`, and `architecture.md` for the agreed scope, design direction, and technical approach. Treat their open questions as unresolved; do not present assumptions as settled requirements.

## Experience

- Design for desktop and laptop browsers first, while keeping essential features usable at narrower widths.
- Aim for a premium, elegant, clear interface with accessible controls and keyboard navigation.
- Support English and Arabic, including appropriate right-to-left layouts.
- Allow guest use without accounts. Default to Bahraini dinar.

## Bill logic

- Support equal splits and item-based splits, including items shared by a subset of participants.
- Divide tax, service charges, discounts, and tips equally among everyone on the bill.
- Record one payer and calculate what each other participant owes. The app does not transfer money.
- Calculate in integer fils, and allocate rounding differences deterministically so individual shares sum to the bill total.
- Make scanned receipt data editable and provide a manual entry path.

## Development

- Preserve existing user work and follow established project conventions as the codebase develops.
- Use Next.js, React, JavaScript, semantic HTML, CSS, and Tailwind CSS. Storage, scanning, and hosting providers remain unselected.
- Resolve or explicitly document assumptions about guest history, identity across outings, shared-link permissions, and payment status before implementing dependent behavior.
- Test calculation rules and rounding with meaningful examples, including shared items and charges. Verify relevant user flows and both language directions when implemented.
- Keep the plan and design documents aligned with product decisions as they are made.
