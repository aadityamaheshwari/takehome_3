# AI Usage

## Tools used

- Hermes Agent with Laguna (I am using the best free tools available these days)

## What AI helped with

| Area | How AI was used | Your involvement |
|------|-----------------|------------------|
| Test Suite Expansion | Generated additional unit test blocks for `status` query parameter filtering in `tests/progress.api.test.ts`. | Verified test cases strictly followed existing `supertest` patterns and assertion styles. |
| React UI Development | Assisted in structuring React state (`App.tsx`) to manage loading, error, and empty states alongside status filter controls. | Reviewed state transitions, error boundary handling, and styling logic to ensure seamless UX. |

## What you rejected or rewrote

When expanding the backend test suite, the initial AI suggestion attempted to refactor existing core test assertions into helper functions. I rejected this abstraction to keep the test setup flat, legible, and directly matching the starter code style.

## What you'd do differently without AI

Without AI assistance, wiring up the reactive state management and error boundary boilerplate in React would have taken slightly more manual setup time since I have not touched any front end JS frameworks in the last 4 years. react is my choice and where my experience is however and hence I at least still find it readable.

## Ownership statement

Almost all the backend made sense to me except sorting for which I looked up examples on the good old internet without AI. AI updated the test file to inlucde the tests for the new b-rule. AI updated the entire front end component as well.
