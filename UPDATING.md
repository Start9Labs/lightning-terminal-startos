# Updating the upstream version

## Determining the upstream version

- **Lightning Terminal** ([lightninglabs/lightning-terminal](https://github.com/lightninglabs/lightning-terminal)) — latest release tag:

  ```sh
  gh release view -R lightninglabs/lightning-terminal --json tagName -q .tagName
  ```

  The image pin lives in `startos/manifest/index.ts` as the `dockerTag` for the `lightning-terminal` image. Confirm on Docker Hub that the tag you are about to pin exists:

  ```sh
  curl -fsSL "https://hub.docker.com/v2/repositories/lightninglabs/lightning-terminal/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name'
  ```

  A release tag does not guarantee an image. Upstream's `docker.yml` tags images from whatever git tag is pushed, so a failed image build is retried under a *new* git tag and the image lands there instead — which is why this pin is `v0.17.2-alpha-docker` while neither `v0.17.1-alpha` nor `v0.17.2-alpha` has an image. When the release tag has no image, find the retry tag and confirm it descends from the release:

  ```sh
  gh api repos/lightninglabs/lightning-terminal/tags --jq '.[].name'
  gh api repos/lightninglabs/lightning-terminal/compare/<release tag>...<retry tag> --jq '{ahead: .ahead_by, behind: .behind_by, files: [.files[].filename]}'
  ```

  A retry tag should be `behind: 0` and carry only CI or version-string commits.

  Docker Hub also carries a `-path-prefix` variant of each tag, which serves the UI under `/lit`. This package serves it at the root, so pin the plain tag.

## Applying the bump

- In `startos/manifest/index.ts`, set `images['lightning-terminal'].source.dockerTag` to the Docker Hub tag you confirmed above — normally `lightninglabs/lightning-terminal:v<new version>` including the `-alpha` suffix upstream uses (e.g. `v0.16.1-alpha`), or the retry tag when upstream published one (e.g. `v0.17.2-alpha-docker`).
- The version in `startos/versions/current.ts` tracks the upstream **release**, not the image tag: `0.17.2-alpha:0`, never `0.17.2-alpha-docker:0`. StartOS versions carry a single pre-release segment, so a retry tag's name does not parse — and it fails late, at `canMigrateFrom()`, with an error naming neither the file nor the version.
