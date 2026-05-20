# Updating the upstream version

## Determining the upstream version

- **Lightning Terminal** ([lightninglabs/lightning-terminal](https://github.com/lightninglabs/lightning-terminal)) — latest release tag:

  ```sh
  gh release view -R lightninglabs/lightning-terminal --json tagName -q .tagName
  ```

  Pin lives in `startos/manifest/index.ts` as the `dockerTag` for the `lightning-terminal` image (`lightninglabs/lightning-terminal:v<version>`). Upstream publishes the matching tag to Docker Hub; cross-check with:

  ```sh
  curl -fsSL "https://hub.docker.com/v2/repositories/lightninglabs/lightning-terminal/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name'
  ```

## Applying the bump

- In `startos/manifest/index.ts`, set `images['lightning-terminal'].source.dockerTag` to `lightninglabs/lightning-terminal:v<new version>` (include the `-alpha` suffix that upstream uses, e.g. `v0.16.1-alpha`).
