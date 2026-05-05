# Content Packs

`content/bundled-packs/cs-degree` is intentionally not committed to this
repository. It is populated from `https://github.com/callumalpass/cs-degree`
during the GitHub Pages workflow and can be checked out locally with:

```bash
npm run content:checkout
```

The Vite static build imports that path directly, so the pack must be present
before running tests, content validation, or `npm run build`.
