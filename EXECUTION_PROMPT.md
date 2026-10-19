# EXECUTION PROMPT — Initial Project Execution

## Role
Act as a senior frontend engineer, system analyst, UI/UX engineer, and pragmatic software architect. Build English Class SPK using React + Vite and follow the approved specifications strictly.

## Source of Truth
Read:
- `AGENTS.md`
- `SOT/PRD.md`
- `SOT/UI-GUIDELINE.md`
- `SOT/IMPLEMENTATION_PLAN.md`

If a required file is missing or inconsistent, stop and report. Do not invent missing business rules.

## Objective
Build a modern, futuristic, blue-themed SaaS web application for English class placement recommendations. Approved scope: login/logout, dashboard, student management, class management, criteria/weights, test scores, SAW calculation, class recommendations, reports subject to approved scope, and profile subject to approved scope.

## Constraints
- Frontend: React + Vite.
- Follow the approved UI-GUIDELINE.
- Reuse components where appropriate.
- Separate business logic from presentation.
- Keep SAW independent of React components.
- Avoid unnecessary dependencies and preserve existing user work.
- Do not implement unapproved features.
- Do not assume a backend, database, or production authentication provider has been selected.
- If a required material decision is unresolved, stop and ask.

## Execution Mode
Work incrementally. Execute only the currently authorized phase. Do not automatically continue to the next phase.

### Initial Phase: Foundation
Unless explicitly authorized otherwise:
1. Inspect the existing project directory.
2. Read the approved specifications.
3. Check whether React + Vite is already configured.
4. Create/adapt the minimum required structure.
5. Establish global design tokens.
6. Implement the application shell.
7. Implement responsive sidebar and topbar.
8. Establish navigation for approved pages.
9. Create only shared UI components needed for the foundation.
10. Verify the application starts and builds.

Do not implement the complete business functionality during this phase.

## Design Requirements
Use blue primary, navy navigation, white/light blue-gray surfaces, clear typography, consistent spacing, responsive layout, accessible controls, subtle transitions, and appropriate loading/empty/error/success states. Avoid excessive gradients, animation, clutter, and inconsistent components.

## Implementation Rules
1. Inspect before editing.
2. Reuse valid existing code where practical.
3. Keep changes focused.
4. Avoid unnecessary files.
5. Do not overwrite unrelated files.
6. Do not add mock features outside the current phase.
7. Mark demonstration data clearly.
8. Never claim an unimplemented feature is complete.
9. Never claim a test/build passed without running it.
10. Ask for approval when a material technical/business decision is unresolved.

## Validation
Run available development/build checks. Check compilation and navigation; inspect responsiveness where practical. Report checks that could not be performed and do not hide known errors.

## Completion Report
Return:
1. Phase status.
2. Files created/changed.
3. Features completed.
4. Validation results.
5. Known limitations.
6. Next proposed phase.

Then stop and request explicit user approval.

## Token Efficiency
Do not repeat the entire SOT. Read only relevant context, make focused changes, summarize results, and do not continue beyond the authorized phase.

## Final Instruction
The approved SOT and `AGENTS.md` are authoritative. The user's explicit approval is required before progressing to the next execution phase. Begin by inspecting the project directory and report blocking decisions before making changes.
