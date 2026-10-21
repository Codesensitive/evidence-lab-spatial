# Spatial interface research and decisions

Research date: 21 October 2026. This is an independent redesign of the frozen Evidence Lab application, not a replacement for the canonical portfolio.

## Reviewed skill sources

| Source | Useful contribution | Decision |
| --- | --- | --- |
| [Anthropic Frontend Design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Derive a distinctive identity from the actual subject, deliberate type and composition, critique the result against the brief | Use document evidence as the central visual subject, pair Sora with IBM Plex Sans, and review the actual rendered site |
| [Taste Skill](https://github.com/Leonxlnx/taste-skill) | Research and visual review rather than assembling familiar landing-page motifs; distinguish a presentation page from a working application | Keep an expressive hero and a readable, operational lab; do not add vanity metrics or fake customers |
| [CloudAI-X Three.js Skills](https://github.com/CloudAI-X/threejs-skills) | Scene, camera, material, geometry and lifecycle guidance aligned to current Three.js releases | Reviewed for the first version; the revised design uses CSS perspective to avoid an unnecessary WebGL renderer |
| [Three.js documentation](https://threejs.org/docs/) | Authoritative API reference for renderer, geometry, materials and disposal | Reviewed as an implementation alternative; no Three.js runtime is loaded in the revised version |

These sources were reviewed as references. No third-party skill scripts or global plugins were installed or executed. Their instructions do not override the user's requested functionality or browser-control rules.

## Art direction

The revised visual concept is the retrieval interface itself arranged in three dimensions: source library, ranked context and cited evidence. A single complete section moves to the front when its tab is selected. Translucent backing layers, edge highlights, material thickness and a perspective floor create depth without concealing content or using a decorative document sculpture. These example planes illustrate bundled sample content and do not render uploaded documents.

The material system extends throughout the page: raised header and workspace, beveled mode controls, inset form fields, elevated process panels and an integrated engineer section. Reading surfaces and working controls remain flat for usability. Desktop pointer movement adjusts the illustrative pipeline slightly; mobile retains a stable composition.

## Performance and accessibility decisions

- CSS perspective and transform layers replace the WebGL renderer. The Three.js dependency and vendoring are removed.
- Small idle motion pauses offscreen, when the tab is hidden, while the lab is busy, or through the explicit motion control.
- Reduced motion disables idle animation and pointer perspective; stage explanations remain usable.
- Native stage buttons expose pressed states and update a live explanation.
- Layout stays present without JavaScript or observer APIs; there is no 3D asset download or GPU renderer requirement.
- Depth styles are included in the content-hashed main stylesheet, so their updates invalidate the deployed asset.
- All changes remain presentation only. The pipeline graphic uses illustrative sample content, not private uploaded text.

## Preservation boundary

All 19 first-party RAG modules are unchanged from commit `df31e04adc9bbc880b6b47dd15f93ad98100d29d`, with line endings normalized for hash verification. `frozen-core.json` records their hashes and the original HTML control IDs. Automated tests verify that boundary.

Changes are presentation, the separate scene module, shared depth styles, presentation asset fingerprinting, relative links for project Pages hosting, preview metadata, development port configuration and supporting tests/docs. The redesign has noindex metadata and retains original canonical URLs so it does not compete with the existing indexed portfolio.
