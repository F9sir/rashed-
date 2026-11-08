# Storage, sharing, and balances

[Plan](../docs/plan.md) · [Design](../docs/design.md) · [Architecture](../docs/architecture.md) · [Project guidance](../docs/AGENTS.md)

Suggested code paths are relative to the project root. Original task numbers below are retained so dependency references remain clear. Work on independent sections without waiting for unrelated open decisions.

## Original task 7: Add durable guest storage and history

- [ ] Implement a storage interface and the selected persistent provider; validate and recalculate bills on the server before saving.
- [ ] Implement the agreed guest access and recovery model without requiring accounts. Handle save and retrieval errors with a clear recovery path.
- [ ] Show recent bills and a history list with date, total, and participants; allow an authorized guest to reopen a saved bill.

**Depends on:** task 1 storage and recovery decisions; tasks 5–6. **Suggested files:** `lib/data/`, `app/api/bills/`, `features/history/`, `app/history/page.js`.

**Done when:** a saved bill can be reopened according to the agreed recovery model, including across devices if selected, and unauthorized access is rejected. Reference: [system overview](../docs/architecture.md#system-overview).

## Original task 8: Add sharing and joining

- [ ] Create a link and QR code for a saved bill; let guests open the link and join according to the agreed interaction model.
- [ ] Enforce server-side access and editing/finalization permissions, expiry, and revocation as decided in task 1. Treat link credentials as secrets and avoid logging them.
- [ ] Explain sharing permissions in the interface and handle expired, invalid, and revoked links.

**Depends on:** task 1 sharing decisions and task 7. **Suggested files:** `app/bills/[id]/page.js`, `app/api/bills/`, `features/bills/share.js`.

**Done when:** a second browser can open and use the shared bill within its permissions, and invalid or revoked access fails safely. Reference: [results and sharing](../docs/design.md#results-and-sharing).

## Original task 10: Add cross-outing balances

- [ ] Implement the agreed way to identify friends across bills without accounts, with a way to correct mistaken identities.
- [ ] Calculate and display balances from saved bills and, if selected, payment-status records; do not assume an amount is paid without an explicit record.
- [ ] Add recent bills and a concise balance summary to the dashboard, including useful empty states.

**Depends on:** task 1 identity and payment-status decisions and task 7. **Suggested files:** `features/history/`, `lib/calculations/balances.js`, `app/page.js`.

**Done when:** multiple saved outings produce traceable balances under the agreed rules, including any recorded payments if enabled. Reference: [history and balances](../docs/design.md#history-and-balances).
