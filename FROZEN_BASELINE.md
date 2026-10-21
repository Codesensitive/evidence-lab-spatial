# Frozen live baseline

The original live portfolio remains https://codesensitive.github.io/ in https://github.com/Codesensitive/Codesensitive.github.io.

- Frozen commit: `df31e04adc9bbc880b6b47dd15f93ad98100d29d`.
- Remote annotated tag: `live-frozen-2026-10-21`.
- Remote archive branch: `archive/live-2026-10-21`.
- Original main branch: locked read-only through GitHub branch protection, with administrator enforcement and force-push/deletion disabled.
- Local repository backup: `D:\Portfolio\portfolio-live-frozen-2026-10-21.bundle`.
- Original checkout: `D:\Portfolio\github-pages`.
- Independent redesign checkout: `D:\Portfolio\evidence-lab-spatial`.

Only the redesign repository receives UI changes. Its main branch does not deploy over the original user-site homepage. GitHub administrators can deliberately change branch protection in future if work on the original needs to resume; this freeze is not irreversible.

The independent repository retains original commit history. `frozen-core.json` and its regression test verify the unchanged application modules. Historical guides copied from the original describe that original deployment; see this repository's README and DESIGN_RESEARCH for the spatial variant.
