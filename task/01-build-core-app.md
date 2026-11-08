# Build the core app

[Plan](../docs/plan.md) · [Design](../docs/design.md) · [Architecture](../docs/architecture.md) · [Project guidance](../docs/AGENTS.md)

Suggested code paths are relative to the project root. Original task numbers below are retained so dependency references remain clear. Work on independent sections without waiting for unrelated open decisions.

## Original task 1: Resolve product and service decisions

- [ ] Decide guest history and recovery across browsers, friend identity across outings, shared-link editing and finalization permissions, link expiry/revocation, and whether payment status is tracked.
- [ ] Choose persistent storage, an OCR provider or library, receipt retention and upload limits, and hosting. Document costs and operational requirements before integrating services.
- [ ] Decide how equal total entry interacts with separately entered tax, tips, discounts, and service charges so adjustments are never counted twice. Define how discounts are handled when a person's share would otherwise become negative.
- [ ] Choose a working name and visual direction; distinguish provisional design choices from approved branding.

**Done when:** decisions and their implications are recorded in the plan and architecture. Core local calculations and interface work can proceed independently; shared persistence, cross-outing balances, and OCR integration depend on the applicable decisions above.

## Original task 2: Set up the application

- [ ] Initialize Next.js App Router with JavaScript/JSX and Tailwind CSS; configure development, build, lint, and a test runner.
- [ ] Create the base layout, global styles, and a small set of reusable accessible controls.
- [ ] Establish a desktop-first visual system with tokens for typography, spacing, color, focus, and error states. Keep branding provisional until approved.

**Suggested files:** `package.json`, `app/layout.js`, `app/globals.css`, `app/page.js`, `components/`.

**Done when:** the app starts and builds, the dashboard renders without an account, and controls work with a keyboard at desktop and narrower widths. Reference: [design direction](../docs/design.md#direction).

## Original task 3: Add language and currency foundations

- [ ] Provide English and Arabic messages and a language switch; set document language and direction correctly.
- [ ] Format BHD amounts with three decimal places and parse user input without floating-point money calculations.
- [ ] Use logical layout properties and verify labels, numeric input, and mixed-direction currency text in both languages.

**Depends on:** task 2. **Suggested files:** `lib/i18n/`, `components/language-switch.js`, `lib/calculations/money.js`.

**Done when:** switching language updates the interface and direction, and valid BHD values round-trip between display and integer fils. Reference: [accessibility](../docs/design.md#interaction-and-accessibility).

## Original task 4: Implement and test bill calculations

- [ ] Define and validate bill, participant, item, assignment, adjustment, and payer data. Reject invalid amounts, missing participants, unassigned items, and inconsistent totals before finalization.
- [ ] Implement equal splits, item splits among selected participants, and equal allocation of charges and discounts.
- [ ] Use integer fils and deterministic remainder allocation; ensure the sum of shares matches the final bill total and each non-payer's debt is clear.
- [ ] Add meaningful tests for unequal item assignments, shared items, indivisible fils, discounts, invalid inputs, and payer shares. Apply the decisions from task 1 for ambiguous adjustment cases.

**Depends on:** task 3 for money helpers; adjustment rules in task 1. **Suggested files:** `lib/calculations/`, `lib/validation/`, `tests/calculations/`.

**Done when:** calculations are independent of React, all tests pass, and the same functions can be used by the server. Reference: [calculation boundary](../docs/architecture.md#calculation-boundary).

## Original task 5: Build bill creation and editing

- [ ] Create a guest bill with date, participants, and one payer; allow participants to be added, renamed, and removed with clear handling of existing assignments.
- [ ] Support total entry and manual item entry, editing, and removal; capture charges and discounts without double counting.
- [ ] Show a running total and actionable validation messages; keep in-progress edits in client state.
- [ ] Design the desktop editor with bill details in the main area and participants and totals in a secondary area; adapt to narrower windows.

**Depends on:** tasks 2–4. **Suggested files:** `app/bills/new/page.js`, `features/bills/`, `components/`.

**Done when:** a guest can create and correct a complete bill using either supported input path. Reference: [create and edit bill](../docs/design.md#create-and-edit-bill).

## Original task 6: Build split and results screens

- [ ] Let the user choose an equal split or assign each item to one or more participants, including everyone for shared items.
- [ ] Display the final total, adjustments, each person's share, the payer, and amounts owed to that payer.
- [ ] Require a review before finalization, show errors for incomplete assignments, and allow the user to return and edit.

**Depends on:** tasks 4 and 5. **Suggested files:** `features/bills/split-editor.js`, `features/bills/bill-results.js`.

**Done when:** a complete bill can be reviewed and calculated correctly in both modes, and the interface makes clear that money is not transferred. Reference: [calculation rules](../docs/plan.md#calculation-rules).
