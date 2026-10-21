# Spatial interface research and decisions

Research date: 21 October 2026. This is an independent redesign of the frozen Evidence Lab application, not a replacement for the canonical portfolio.

## Reviewed skill sources

| Source | Useful contribution | Decision |
| --- | --- | --- |
| [Anthropic Frontend Design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Derive a distinctive identity from the actual subject, deliberate type and composition, critique the result against the brief | Use document evidence as the central visual subject, pair Sora with IBM Plex Sans, and review the actual rendered site |
| [Taste Skill](https://github.com/Leonxlnx/taste-skill) | Research and visual review rather than assembling familiar landing-page motifs; distinguish a presentation page from a working application | Keep an expressive hero and a readable, operational lab; do not add vanity metrics or fake customers |
| [CloudAI-X Three.js Skills](https://github.com/CloudAI-X/threejs-skills) | Scene, camera, material, geometry and lifecycle guidance aligned to current Three.js releases | Build a self-hosted WebGL scene using pinned Three.js 0.186.1 with cleanup, visibility controls and bounded pixel ratio |
| [Three.js documentation](https://threejs.org/docs/) | Authoritative API reference for renderer, geometry, materials and disposal | Use simple geometry and standard lighting, without postprocessing chains or external 3D model downloads |

These sources were reviewed as references. No third-party skill scripts or global plugins were installed or executed. Their instructions do not override the user's requested functionality or browser-control rules.

## Art direction

The visual concept is an evidence instrument: source sheets hovering over a calibrated metal platform, a retrieval orbit, and an amber evidence marker. The three interactive states explain the actual document-to-answer pipeline. It is a custom procedural scene, not a stock globe, particle sphere, decorative robot or generic 3D blob.

The palette uses a charcoal blue-green canvas, legible warm whites, and restrained amber. The hero gives the model room; the rest of the site preserves usable text widths and inspection controls. The lab uses deliberate panel hierarchy and readable labels instead of putting essential form controls in a canvas.

## Performance and accessibility decisions

- Load the 3D library only when its scene enters the viewport.
- Limit drawing to approximately 30 frames per second and device pixel ratio to 1.5.
- Stop continuous rendering while the scene is offscreen, the document is hidden, the user pauses, or the lab reports an active operation.
- Honor reduced motion at startup and avoid pointer parallax under that preference. Visitors can explicitly resume motion.
- Retain a CSS document illustration if WebGL initialization fails or a context is lost.
- Keep stage explanations operable without WebGL and expose native buttons with pressed states.
- Dispose geometry, material, texture and renderer resources on teardown.
- Use self-hosted runtime assets; no animation vendor service, analytics or model API is added.

The sculpture illustrates the pipeline and does not display uploaded document content. The lab continues to process real documents through the original RAG implementation.

## Preservation boundary

All 19 first-party RAG modules are unchanged from commit `df31e04adc9bbc880b6b47dd15f93ad98100d29d`, with line endings normalized for hash verification. `frozen-core.json` records their hashes and the original HTML control IDs. Automated tests verify that boundary.

Changes are presentation, the separate scene module, Three.js vendoring, presentation asset fingerprinting, relative links for project Pages hosting, preview metadata, development port configuration and supporting tests/docs. The redesign has noindex metadata and retains original canonical URLs so it does not compete with the existing indexed portfolio.
