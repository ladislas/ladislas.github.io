# Workshop Terminal

Notes from the quiet edge of building things.

Workshop Terminal is the personal publishing site for Ladislas.
It is a calm, accessible workshop notebook for documenting code, product thinking, tools, systems, experiments, failures, projects, and field notes.

## Planned v1

- Astro + MDX + GitHub Pages
- Logs, Projects, Routes, and About
- dark-first theme with an intentional light theme
- persistent High Clarity mode
- album-cover-style browsing
- RSS
- optional GitHub Discussion links per Log

## Product language

Preferred terms for this project:

- **Workshop Terminal**: the site and publishing system
- **Log**: a written post, note, guide, experiment, retrospective, or reference
- **Project**: a living hub for ongoing or finished work
- **Route**: a curated topic destination that groups Logs and Projects
- **Cover**: the album-cover-style image attached to a Log or Project
- **High Clarity**: a persistent reader-controlled display mode that increases readability and reduces decorative ambiguity

See `CONTEXT.md` for the full shared vocabulary and domain rules.

## Status

This repository is being bootstrapped from the Workshop Terminal PRDs.

## Authoring workflow

For v1, the publishing workflow stays Git-based:

1. Draft a Log or Project in `src/content/`.
2. Choose a Cover.
3. Generate card and hero crops.
4. Add the required metadata.
5. Preview locally with `pnpm dev`.
6. Publish through GitHub.

Published Logs and Projects should include Cover metadata. Drafts may omit Cover fields while the writing is still in progress.

## Development

This repo uses `mise` for tool installation and `hk` for versioned pre-commit checks.

### Bootstrap

- Install `mise`: `brew install mise`
- Trust the repo config: `mise trust`
- Install repo-managed tools: `mise install`
- Install JavaScript dependencies: `pnpm install`
- Install the git hook: `mise run hooks`

### App commands

- Start local dev server: `pnpm dev`
- Run Astro type/content checks: `pnpm check`
- Build the static site: `pnpm build`
- Preview the production build: `pnpm preview`

### Linting

- Run all checks: `mise run lint`
- Run Markdown checks: `mise run lint:markdown`
- Run YAML checks: `mise run lint:yaml`
- Auto-fix Markdown lint issues: `mise run lint:fix`

The hook setup also includes the generic built-in checks from `hk`, including a guard against committing directly to `main`.
