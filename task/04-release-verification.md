# Release verification

[Plan](../docs/plan.md) · [Design](../docs/design.md) · [Architecture](../docs/architecture.md) · [Project guidance](../docs/AGENTS.md)

Suggested code paths are relative to the project root. Original task numbers below are retained so dependency references remain clear. Work on independent sections without waiting for unrelated open decisions.

## Original task 11: Verify the complete release

- [ ] Run lint, production build, and calculation tests; fix failures.
- [ ] Exercise create → edit → split → review → save → share → reopen with separate browser sessions, plus receipt correction and manual fallback.
- [ ] Check history and balances across outings, invalid links, save errors, Arabic and English, keyboard navigation, and desktop and narrower layouts.
- [ ] Document setup, required environment variables without secrets, and any known limitations.

**Depends on:** tasks 2–10. **Suggested files:** `tests/`, `README.md`.

**Done when:** the complete first-release flow works against the chosen services and the documented checks pass. Do not mark blocked provider-dependent features complete based only on a mock.
