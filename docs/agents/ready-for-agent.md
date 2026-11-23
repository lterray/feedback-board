# Definition of ready-for-agent

A ticket gets the `ready-for-agent` label when an agent can finish it with no one watching and no questions asked. Every point below must hold; when one doesn't, the ticket stays unlabelled, or gets `ready-for-human` if it needs judgement, outside access or manual testing.

## The ticket

1. **Describes behaviour, not steps.** It says what a team member can do or see once it ships, in the terms of `GLOSSARY.md`. It names no file paths or line numbers, which go stale.
2. **Has acceptance criteria that can each be checked.** Each criterion passes or fails by a test or a short demo; "works correctly" is not a criterion.
3. **Covers the edges.** Empty states, invalid input and failures each have a criterion, or are named as out of scope.
4. **States what is out of scope,** so the agent neither gold-plates nor touches adjacent features.
5. **Lists its blockers,** as GitHub "blocked by" links or in its text, and every blocker is closed before work starts.
6. **Leaves no decision open.** Anything hard to reverse is settled in an ADR in `docs/adr/` or in `docs/requirements.md`. If the ticket needs a new decision, decide it first.
7. **Fits one session.** One agent can build and test it in a single fresh context. If not, split it into thinner vertical slices.
8. **Asks for nothing outside the repo:** no credentials, external accounts, paid services or production data.

## What "done" means for the agent

- Every acceptance criterion is met and covered by a test where one can be written.
- `npm run check` passes locally, and CI passes on the pull request.
- No lint limit, coverage floor or architecture rule was loosened to get there.
- The pull request links the ticket, so merging it closes the ticket.
