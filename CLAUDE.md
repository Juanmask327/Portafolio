# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page personal portfolio site for Juan Manuel B. Skolik (Software Engineering student / Full Stack & Data Engineer), written in Spanish. It is plain HTML/CSS/JS — no framework, no bundler, no package manager scripts beyond one custom build script.

## Files

- `index.html` — the entire page markup: nav, hero, scroll-reveal showcase, about, projects, research/publications, automatismos (automation case studies), contact form, footer, and several modal dialogs (all modals live inline at the bottom of `index.html`, toggled via `openModal(id)`/`closeModal(id)` in `script.js`).
- `styles.css` — all styling. Uses a CSS custom-property design system defined in `:root` at the top (`--bg`, `--surface-*`, `--primary`, `--secondary`, `--tertiary`, `--error`, type scale, spacing, radii). Reuse these tokens instead of hardcoding colors/sizes.
- `script.js` — vanilla JS, no modules/bundling. Handles: hamburger nav, navbar scroll shrink, a custom scroll-driven 3D reveal animation (`updateContainerScroll`), `IntersectionObserver`-based fade-in and stat counters, active-nav-link highlighting, the contact form (submits via `fetch` to FormSubmit.co — `https://formsubmit.co/ajax/<email>`), and modal open/close logic. Modal trigger functions (`openFirmaModal`, `openCodeModal`, etc.) are called directly from `onclick=` attributes in `index.html`, so keep their names in sync between the two files.
- `build.js` — bundles `index.html` + `styles.css` + `script.js` into a single self-contained HTML file (inlines CSS into a `<style>` tag and JS into a `<script>` tag before `</body>`) and writes it to the user's Desktop (`~/Desktop/portafolio_juan.html`, falling back to `~/OneDrive/Desktop`). This is meant for producing a portable, distributable copy of the site.
- `package.json` — only dependency is `motion` (Motion animation library); it is not currently imported/used anywhere in `script.js`.

## Commands

- Bundle a standalone copy of the site to the Desktop: `node build.js`
- No test suite, linter, or dev server is configured. To preview locally, just open `index.html` directly in a browser (no build step required for normal editing).
- Package management uses `pnpm` (see `pnpm-lock.yaml`): `pnpm install`.

## Working in this repo

- There is no build step for day-to-day edits — `index.html`, `styles.css`, and `script.js` are served/opened as-is. Only run `build.js` when a bundled single-file export is specifically needed.
- When adding a new modal or interactive element, wire it up the same way existing ones are: add the markup as a `.modal-overlay` block near the bottom of `index.html`, add matching `open*/close*` functions in `script.js`, and register the modal's id in the two `forEach` arrays in `script.js` (click-outside-to-close and Escape-to-close).
- Keep new colors/spacing/typography consistent with the CSS variables defined in `styles.css`'s `:root` rather than introducing new literal values.
- Content is in Spanish; keep new user-facing copy consistent with that.
