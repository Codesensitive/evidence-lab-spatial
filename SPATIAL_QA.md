# Spatial redesign verification

Date: 21 October 2026.

## Preservation

All 19 RAG application modules match the frozen live source after CRLF/LF normalization. Every original application control ID remains present. The source manifest and automated regressions enforce this boundary. No ingestion, retrieval, embedding, OCR, prompting, generation, citation, comparison or trace implementation was rewritten for the redesign.

## Automated

`npm test`: 70 passed, zero failures. The inherited 67 checks remain, with preview metadata expectations updated for a separate noindex deployment and relative links. Three new checks cover application-source parity, original control IDs, and the scene's observer-unavailable fallback with usable stage explanations.

`npm install` reported zero dependency vulnerabilities when adding pinned Three.js 0.186.1. This is a package audit result at that time, not a claim that all application vulnerabilities are excluded.

## Actual browser checks

- The real WebGL scene initialized and rendered its document stack and instrument platform.
- Selecting Retrieval changed the explanation and pressed state. Pause motion stopped the frame counter; Resume restored animation while visible.
- With the hero offscreen, continuous scene rendering stopped.
- Uploaded the synthetic two-page project-brief.pdf through the actual browser file chooser. It appeared as one document with two pages.
- In Advanced BM25/evidence-only mode, asking the launch date returned 21 November 2026, cited to page 2, chunk 2.
- Inspected the desktop controls, result layout and source labels for readable contrast and sizing.
- At a 390-pixel viewport, Simple mode, uploaded-document list and hero fit without horizontal page overflow. The 3D presentation and mode controls remained visible. Restored the viewport afterward.
- No captured browser warnings or errors during the checked local flow.

Embedding, OCR and WebLLM implementations are preserved and covered by inherited tests and earlier browser evidence. Their large model downloads were not all repeated for this presentation-only change. No new cross-model accuracy claims are made.

The WebGL fallback is exercised with controlled unavailable observers in automated tests; physical context loss and every GPU/driver combination were not reproduced. Reduced-motion behavior and cleanup are implemented but are not an exhaustive accessibility or device certification.

The new GitHub Pages deployment uses its own project path. Public deployment verification is recorded in the completion message and GitHub Actions; the original homepage is not replaced.
