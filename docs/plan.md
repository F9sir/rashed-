# Bill-splitting web app plan

## Purpose

Create a browser-based app for splitting restaurant and café bills with friends. One person pays the venue, and the app calculates how much each friend owes. The initial audience is the owner and their friends.

## First release

- Use the app as a guest, without an account.
- Create a bill and add friends by name, or invite them through a link or QR code.
- Enter a total, enter items and prices manually, or scan a receipt and review the extracted details.
- Split the total equally or assign items to the people who shared them.
- Record the person who paid and show what each other person owes them.
- Share the result, save bill history, and view balances across outings.
- Support English and Arabic, with Bahraini dinar as the default currency.
- Calculate amounts only; the app does not transfer money.

## Calculation rules

- An equal split divides the total among the selected participants.
- An item split divides each item equally among the people assigned to it. A shared item can include some or all participants.
- Divide tax, service charges, tips, and discounts equally among everyone on the bill.
- Use integer fils for calculations. Allocate rounding differences deterministically so the sum of individual shares equals the final total.
- Show a clear breakdown of items, adjustments, the total, and each person's share before finalizing.

## Main flow

1. Create a bill and identify the payer.
2. Add participants or invite them to join.
3. Enter the total or add items manually or from a receipt.
4. Choose an equal or item-based split and assign shared items.
5. Review the bill and correct any receipt recognition errors.
6. View and share each person's amount, and save the bill to history.
7. Review previous bills and balances across outings.

## Decisions to resolve

- How guest users access saved history across browsers or devices.
- How the same friend is identified across outings without accounts.
- Whether everyone with a shared link can edit, or only the creator can finalize a bill.
- Whether users can manually mark a debt as paid, and how that changes balances.
- How shared links are protected, expire, or are revoked.
- The receipt-scanning provider, expected accuracy, cost, and fallback when scanning fails.
- The app name and visual identity.

## Delivery stages

1. Resolve the open decisions and document the resulting product rules.
2. Define screen flows, data storage, sharing permissions, and the technical architecture.
3. Create an AGENTS.md with project-specific development conventions.
4. Build guest bill creation, participants, equal splits, and item assignment.
5. Add shared links, QR codes, receipt scanning, and an editable review step.
6. Add bill history, cross-outing balances, and Arabic and English support.
7. Test calculations, rounding, shared access, receipt corrections, and desktop browser layouts.

Implementation details and technology choices remain open until the architecture stage.
