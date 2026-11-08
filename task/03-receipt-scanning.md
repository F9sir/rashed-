# Receipt scanning

[Plan](../docs/plan.md) · [Design](../docs/design.md) · [Architecture](../docs/architecture.md) · [Project guidance](../docs/AGENTS.md)

Suggested code paths are relative to the project root. Original task numbers below are retained so dependency references remain clear. Work on independent sections without waiting for unrelated open decisions.

## Original task 9: Add receipt scanning and review

- [ ] Add receipt upload, validate file type and size on the server, and implement the chosen OCR adapter with secrets kept server-side.
- [ ] Present the receipt and extracted items, prices, charges, and total for correction before adding them to the bill.
- [ ] Provide clear scanning failure feedback and a manual-entry fallback; apply the agreed receipt retention policy.

**Depends on:** task 1 OCR and retention decisions, task 5. **Suggested files:** `features/receipts/`, `app/api/receipts/`, `lib/receipts/`.

**Done when:** a guest can scan, correct, and use a receipt, or finish manually when recognition fails. Reference: [review receipt](../docs/design.md#review-receipt).
