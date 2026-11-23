# Feedback board

A board where a team posts improvement ideas and votes on them, so everyone can see which ideas have the most support.

## People

**Team member**:
A person on the team who can post ideas and vote.
_Avoid_: user, person, voter, account

**Team**:
The fixed list of team members, maintained as a file.
_Avoid_: roster, user list

**Current team member**:
The team member whose name is picked in this browser; posts and votes are made as them.
_Avoid_: logged-in user, signed in, session

**Author**:
The team member who posted an idea.

## Ideas and votes

**Idea**:
An improvement proposal with a title and an optional description.
_Avoid_: suggestion, post, item, feedback

**Vote**:
One team member's support for one idea; a team member has at most one vote per idea.
_Avoid_: like, upvote, point

**Retract**:
To take back your own vote on an idea.
_Avoid_: unvote, remove vote, cancel

**Board**:
All ideas, shown in ranking order.
_Avoid_: list, feed

**Ranking**:
The board's order: most votes first, and the newer idea first when votes are tied.
