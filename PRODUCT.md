# Product Notes

## User problem

Learners across enterprise organizations lose momentum when they can't easily track where they left off in their ongoing training courses. Without a clear overview of active progress, completion percentages, and inactive alerts, learners either abandon stale courses or re-read already-completed material. This leads to lower course completion rates and increased administrative friction for corporate training compliance.

## MVP scope

- **Progress Overview API:** Endpoint returning active learner course enrollments with computed progress percentages and inactivity stale flags.
- **Dynamic Status Filtering:** Extended backend endpoint allowing callers to filter by course enrollment status (`in_progress`, `completed`, `not_started`, or `all`).
- **Interactive Learner Dashboard:** React UI displaying learner progress with real-time status filtering and instantaneous learner switching (Learner 1, Learner 2, and unknown Learner 999).
- **Resilient UI States:** Explicit UI feedback handling for active loading, empty results, and non-200 error responses (e.g., 404 learner not found).

## Extra business rule

**Flexible Enrollment Status Filtering (`?status=` query parameter):**
Beyond the baseline test requirements, I extended `getInProgressCourses` and route validation to accept an optional `status` filter (`in_progress`, `completed`, `not_started`, or `all`), defaulting to `in_progress`.

*Why it matters:* Learners and corporate administrators need visibility into full course lifecycles. Allowing status filtering unlocks historical review (completed courses) and future planning (unstarted courses) within a single API endpoint while maintaining full backward compatibility with baseline test specifications.

## What I intentionally cut

| Cut | Why |
|-----|-----|
| Course Detail / Lesson Breakdown Page | Focused on validating the high-level progress list first; deep-dive lesson breakdowns represent a v2 feature once list engagement is established. |
| Persistent Storage (Database) | Relied on in-memory seed data to maintain a thin, zero-dependency setup strictly aligned with the 2-hour scope limit. |
| Full Authentication Flow | Used a stubbed learner selector instead of full token-based auth to keep the focus on core product delivery and domain validation. |

## Success metric

- **Metric name:** 14-Day Inactive Course Resumption Rate.
- **How you'd measure it:** Percentage of stale courses (marked `isStale: true`) that record a new lesson completion within 14 days of being rendered on the progress dashboard.
- **What "good" looks like in the first 30 days:** A $\ge 20\%$ uplift in resumed progress for inactive courses compared to the un-flagged baseline.

## Assumptions

1. **Stale Inactivity Threshold:** Assumed strict $> 30$ calendar days of inactivity determines `isStale: true` based on the provided helper contract.
2. **Default Filter Behavior:** Assumed missing query parameters should strictly return `in_progress` courses to guarantee zero contract breakage for existing clients.
3. **Completion Calculation:** Assumed standard integer rounding (`Math.round`) for `completionPercentage`, defaulting to `0%` if a course has zero total lessons.

## What I'd build next

- **In-App Progress Resume Action:** Add a direct "Resume Course" button linking straight to the last uncompleted lesson.
- **Pagination & Sorting Controls:** Add client-selectable sorting options (by completion % or last activity) and server-side pagination for learners with large course catalogs.
