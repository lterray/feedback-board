# Identity is picked, not proven, in v1

V1 has no login: the current team member is a name picked from the team in the browser, and the backend trusts the team member id the browser sends, checking only that it is on the team. Anyone can therefore post and vote as anyone else; we accept that because v1 is a single-machine demo where one person plays the whole team. Login replaces this before any shared hosted instance, and since every endpoint that posts or votes reads the sent id, that change touches all of them.
