# Feedback board v1: requirements summary

Status: agreed on 2026-11-23 after grilling the first draft (`feedback-board-requirements.md`).

## Goal

A single-machine demo of a board where team members post improvement ideas and vote on them. Its only job is a correct ranked list; how the team acts on the ranking is outside the app. One person switches names to play the team.

## Users

- **Team member:** posts ideas and votes. No admin role, no login.
- You pick your name from a list seeded from a file in the repo. The choice is remembered in the browser and can be switched at any time from an always-visible control.
- Reading needs no name. Posting and voting do; the backend rejects a missing or unknown user id.
- Changing the team means editing the seed file and restarting. A removed person keeps their ideas and votes. A remembered name that is no longer in the seed file is treated as "no name picked".
- Accepted risk: anyone can act as anyone else.

## Main flows

### Ideas

- Title is 1 to 120 characters after trimming; whitespace-only counts as missing. Description is 0 to 2,000 characters. Plain text only; line breaks in descriptions are kept.
- Duplicate titles are allowed.
- Each idea shows author, creation date, vote count and a 200-character description preview that expands in place.
- After a successful submit the user returns to the list; the new idea has zero votes and sits at the top of the zero-vote group.

### Voting

- One vote per person per idea, including your own idea. No automatic author vote.
- The vote button is a toggle showing your state; you can vote and retract without limit.
- The backend rejects a second vote, a retraction with no vote, and any vote on a non-existent idea, and changes nothing. Simultaneous duplicate votes count once, guaranteed by the database.
- Only counts are shown, never who voted.

### List

- Sorted by votes, highest first; ties newest first.
- Your own vote updates the count and re-sorts the list immediately.
- Other people's changes appear on the next load. No live updates.
- Loads in full, up to 500 ideas, no paging.

### Empty and failure states

- Empty board: a message with a link to the new-idea form.
- Rejected form: the reason next to the field, typed text kept.
- Backend unreachable: an error, not an empty or stale list. A failed vote resets the button to its real state.

## Constraints

- Angular frontend, NestJS backend, SQLite file through an ORM, one repository.
- Runs from one command; data survives a restart.
- Current desktop Chrome; the form and the vote button are usable by keyboard.
- The seed file ships with a handful of made-up names.

## Out of scope

- Shared hosted instance
- Login and user management
- Comments on ideas
- Editing or deleting ideas
- Statuses such as "planned" or "done"
- Notifications
- Categories, tags and search
- Paging
- Live updates
- Mobile layout

## Done when

- A user can post an idea and see it in the list, at the top of the zero-vote group.
- A user can vote once per idea; a second vote attempt is rejected by the backend, not only hidden in the UI.
- A user can take their vote back, and the count drops by one.
- The list re-sorts immediately when the user's own vote changes the order.
- A title that is empty, whitespace-only or longer than 120 characters is rejected by the backend.
- Posting or voting without a picked name is rejected by the backend.

## Open questions

- None blocking. Stack choices made during the grilling (SQLite, ORM) still need to be recorded as ADRs once the repo exists.
