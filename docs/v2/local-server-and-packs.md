# stu.p v2 Local Server and Packs

The runtime still builds a static GitHub Pages demo from
`content/bundled-packs/cs-degree`, but that directory is no longer committed to
the app repo. CI checks out `https://github.com/callumalpass/cs-degree` into
that path before validation and build. Local v2 use should prefer filesystem
packs.

For a local static build, populate the checkout path first:

```bash
npm run content:checkout
npm run content:validate
npm run build
```

## Serve an External Pack

```bash
stup serve --content-pack ~/content-packs/cs-degree --port 1234
```

The app is available at `http://127.0.0.1:1234` and the UI loads subjects,
activities, tracks, plans, and learner data through `/api/*`.

Useful endpoints:

- `GET /api/packs`
- `GET /api/subjects`
- `GET /api/subjects/:subjectId`
- `GET /api/subjects/:subjectId/assessments`
- `GET /api/activities/:activityId`
- `GET /api/tracks`
- `GET /api/plans/active`
- `GET /api/learner/profile`
- `POST /api/learner/events`
- `POST /api/content/reindex`
- `GET /api/content/validation`

## Validate Packs

```bash
stup content validate --content-pack ~/content-packs/cs-degree
stup content validate --content-pack ~/content-packs/callum-custom
```

The `cs-degree` pack lives upstream at:

```text
https://github.com/callumalpass/cs-degree
```

It has also been extracted locally to:

```text
~/content-packs/cs-degree/
```

The personal overlay convention uses:

```text
~/content-packs/callum-custom/
```

## Authoring Overlay

Create an overlay pack:

```bash
stup author new-pack callum-custom --dir ~/content-packs/callum-custom --extends cs-degree
```

Create remediation content in the overlay:

```bash
stup author new-remediation c.pointers.addresses --content-pack ~/content-packs/callum-custom
```

Agents should write personalized content to the configured authoring pack and
leave upstream packs read-only unless the user explicitly asks otherwise.

## Plans and Learner Data

Learner data is stored outside content packs in the learner home:

```bash
stup config show
stup plan show
stup learner events export
stup learner derive
```

The browser static demo keeps browser-local progress. Local server mode records
events to `events.jsonl` and derives `profile.json`.
