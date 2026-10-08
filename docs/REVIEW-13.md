# Final update review — 2026-10-06

## Baseline and scope

The parent `Piramida` repository is on `master`, has no commits/remote, and
contains the separate `android-offline` repository plus two existing review PNGs.
All application Git operations use `android-offline`. Its starting branch was
`feature/android-offline`, HEAD `a11489c`, with eight modified application files
and untracked relation/history/tutorial/audit documentation and code. No staged
changes were present. Those existing update files are included in the review;
the parent files are preserved. No applicable AGENTS.md was found. READMEs,
PLAN, STATUS, update status, mathematics, Golden Egg, optics, authorship,
Android/offline, history, visualization contract, CI and package scripts were read.
GitHub fetch confirmed no divergence on the starting branch; the remote default
branch is `main`. No open PR existed at the initial remote check.

## Findings and corrections

- `scanMinima().rmsAngle` returned the weighted-error minimum. It now tracks
  the RMS statistic separately. Independent audit and regressions confirm
  **51.846°** at both 0.0005° and 0.001° steps.
- The author credit existed in documentation but was absent from the screen.
  The header now links **Michał Przybylski — prylski.dev**. Compact header
  copy prevents it from covering model controls; additional scene framing keeps
  single-ratio labels clear of the bottom desktop panel.
- Model/control focus could scroll the fixed shell by 56 px and clip its header.
  `overflow: clip` prevents that scroll; only the panels scroll. The regression
  reproduction with the ratio slider now leaves both shell and window at 0.
- Ordinary documentation still called the section an ellipse, claimed a unique
  golden angle and machine-precision equality, and called width search an
  integrator. Corrected to an oval, a numerically found solution, the rounded
  preset residual (<1e-11 relative), and a maximum-width search. Ordinary egg
  rendering is explicitly an illustration distinct from the selected section.
- Ranking documentation overstated independence and workbook parity. Corrected
  to chosen weights, 13 app rows versus 12 workbook rows, and preference for
  11/7. Misleading preset optimum claims were removed from engine descriptions.
- Lange's source is dated **June 2002**, not undated. Node requirements now
  agree with package.json (≥22); the package describes thirteen comparisons.
- A shared cancellable timer prevents progression after hiding or cleanup.
  Tests cover the actual 4.2/18 s deadlines, cancellation and reduced motion.
- Settled pyramid height no longer causes repeated vertex uploads/normal
  recalculation. This reduces idle work; it is not a measured FPS improvement.

## Validation and evidence boundaries

| Check | Result |
|---|---|
| Vitest | **87/87**, four files; 79 original + two RMS + six timer regressions |
| TypeScript | `tsc --noEmit` passes |
| Independent mathematical audit | 60-digit Decimal, both XLSX formulas/hashes, all 13 rows, geometric dependencies, oval maximum and both scans pass |
| Model counts | 11:7 **12/13**, Golden Egg **10/13**; L/W at 11:7 **0.105620285%**, unchanged |
| Geometry | Tests cover actual A/H/S/B/D/E endpoints, sums at one scale, complementary rays/arcs, actual oval contour, L and maximum W at multiple shapes/scales |
| Browser relations | All 13 selectors/results, manual steps 1–4; consecutive switching between scene types and return to the ordinary scene |
| History | All 13 entries in PL/EN; scoped sources and interpretations, 26 recorded entries |
| Tutorial | All nine steps, arbitrary jumps, skip/close, reload/reopen at saved step 5/9, reduced-motion manual controls |
| Previous controls | Seven presets, custom ratio keyboard slider, hologram, rainbow, dimensions, stone, rotation toggle, stereo and swapped eyes exercised |
| Layout | Desktop 1280×720 and portrait 320×740 / 390×844; page width equals viewport width; header/scroll fixes visually checked |
| Fullscreen | Expanded canvas dimensions and exit control verified; in-app host did not expose a standard/WebKit fullscreen element and scaled captures unexpectedly. OS/native fullscreen remains pending |
| Playback | Automated real timer-function tests with a fake clock pass; browser host forces reduced motion, so timed visual playback is not claimed |
| Physical Android | `adb devices` empty; native installation, touch, Back, airplane-mode cold start, orientation and sustained FPS/thermal checks **not performed** |
| Native artifacts | No new APK/AAB was built or installed; builds below are web assets |
| Local builds | Standard web (`dist`), Android web assets (`%TEMP%/pyramid-history-android-check`) and Pages (`%TEMP%/pyramid-history-pages-check`); asset bases `/`, `./`, `/great-pyramid-11-7-lab/` |
| Repository hygiene | Diff whitespace checks; exact staging; XLSX targets/inputs, signing files and parent screenshots unchanged |

Fresh math evidence: [JSON](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/audit-13/review-2026-10-06.json), generated using
`docs/audit-13/verify.py` with bundled Python (openpyxl) and Node 24.19.0.
System Python lacked openpyxl; rerunning with the bundled runtime succeeded.
Vitest/esbuild initially hit sandbox access restrictions; approved execution
outside it passed. No dependency upgrades or installs were needed.

Browser evidence: [all scenes](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/review-13/all-scenes.jpg),
[desktop](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/review-13/desktop-final.jpg), [320 px φ](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/review-13/mobile-320-phi.jpg),
[390 px oval](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/review-13/mobile-390-oval.jpg),
[PL results](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/review-13/browser-pl.json),
[PL/EN history](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/review-13/history-bilingual.json),
[tutorial](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/review-13/tutorial-320.json), [presets](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/review-13/presets.json).
These are browser captures, not physical-device evidence. During live edits a
React Fast Refresh hook-order error occurred; after a full reload it did not
recur in the final interactions. Clock/shadow-map deprecation warnings remain.

## Fresh source review

All fifteen registry URLs were attempted. Thirteen yielded content; the
[British Museum Rhind record](https://www.britishmuseum.org/collection/object/Y_EA10057)
returned 403 and the [Petrie scan](https://gizapyramids.org/pdf_library/petrie_gizeh.pdf)
could not be retrieved. Their earlier scoped notes are retained, without claiming
fresh primary-text verification. No historical inference is promoted to intent.

Checked the [Feinberg original](https://www.fq.math.ca/Scanned/1-3/feinberg.pdf),
[Euclid II.11](https://mathcs.clarku.edu/~djoyce/elements/bookII/propII11.html),
[VI definition 3](https://mathcs.clarku.edu/~djoyce/elements/bookVI/defVI3.html),
[X.9](https://mathcs.clarku.edu/~djoyce/elements/bookX/propX9.html),
[YBC 7289 account](https://myslu.stlawu.edu/~dmel/mesomath/tablets/YBC7289.html),
[Davies research](https://arxiv.org/abs/1101.0492), MacTutor's linked histories
and notation references, [OEIS estimate warning](https://oeis.org/A065421),
and [Lange's dated proposal](https://www.sectioaurea.com/sectioaurea/the_golden_angle.htm).
The two linked Laven papers were accessible and support general rainbow optics,
not pyramid function or the unpublished 2017 correspondence. The adopted
51.83° reference is not newly established as a measured pyramid property.

## Remaining issues and release boundary

No rigorous uncertainty interval for the adopted Brun estimate, global proof of
golden-angle uniqueness, empirical/statistical basis for weights/reference angle,
or exact author-confirmed physical-function hypothesis has been established.
Source workbook frozen maximum-width inputs remain documented limitations for
edited spreadsheet parameters. Build chunks >500 kB and library warnings remain;
no dependency migration or threshold adjustment was used to hide them.

Follow [manual acceptance](https://github.com/MichaelZP/great-pyramid-11-7-lab/blob/1ae5f97299ae20d1f04bf96516c7ded691af2f21/docs/MANUAL_ACCEPTANCE.md), then record physical Android
results before considering readiness. The release remains a draft; no merge,
production deployment or publication was performed.
