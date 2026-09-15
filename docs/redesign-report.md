# Portfolio presentation redesign

## Scope and reference

The previous deployed version is preserved on `archive/pre-fringe-redesign` at `0a8d6c78784b2b141b3c356868f8cb3749444f98`. Astro, all eleven content routes, the 404 page, downloads, asset filenames, font files, license notices, and the GitHub Pages workflow are retained.

The Claude artifact returned an access challenge. Its source could not be inspected. This implementation follows the explicit palette, typography, layout, and motion values supplied in the redesign request; exact matching against the artifact remains unverified.

## Visual and structural changes

- Dark default with the supplied contour-fringe palette; the existing accessible light mode remains available. Gradient rules are restricted to headings, walkthrough top edges, and metric underlines.
- Sticky identity and section navigation; no homepage table of contents.
- Graduate-identity hero, existing location, supporting paragraph, two links, and work-eligibility sentence.
- Four static metric callouts. The Rigid Bench 17% and Semi-Rigid Bench 16% remain separate.
- Featured THOR-5F study and four numbered steps extracted verbatim from its technical-work list.
- Six project cards retain their existing sentences, images, routes, and result labels. Cards filter by discipline.
- Exact contribution boundary is repeated from the THOR-5F page in a designed callout. Public-sharing wording is retained.
- Three existing Approach statements become numbered cards; the fourth is empty. Toolkit cells become inline groups without changing their wording.
- Both education records appear above all six separate experience records. Dates, roles, organizations, and outcomes are retained.
- About, publications, public code, and download details remain accessible. Existing anchor destinations are preserved.
- Every project uses the shared palette, numbered figures, local wide-content scrolling, metric extraction, and sticky in-page navigation.

## Complete wording-change list

| Location | Before | After |
|---|---|---|
| Homepage hero role, moved into H1 | Mechanical / CAE Engineer | Mechanical Engineering Graduate |
| Hub opening identity, in About my work | Mechanical Engineer | Mechanical Engineering Graduate |
| Hub About Me sentence | I am a mechanical engineer specializing | I am a recent mechanical engineering graduate specializing |

The shared navigation now repeats the approved “Mechanical Engineering Graduate” wording. Patrick Thangarajah remains in navigation and contact and is included in the printed hero. Page titles, descriptions, footer links, project text, captions, and download wording required no identity replacements. Factual employment titles are unchanged. All ten project source records compare exactly with the preserved version. The only changes to hub source records are the two replacements listed above.

Existing homepage headings and sentences were moved, not rewritten. “Simulation, measurement, and engineering design.” is retained in About my work. New text is limited to functional structural labels and the explicitly authorized graduate role.

## Unfilled slots

- Relocation statement beside the existing Calgary location: absent from current source.
- Fourth Approach card: only three authored Approach statements exist.
- Separate location column for each of the six roles: no separate role locations are provided in the current source. Existing “part-time and remote” wording remains in the Echoscope title.

No new short card descriptions were authored. Existing card sentences fit the responsive cards.

## Motion and mobile

- Hero: 400 ms fade and 16 px rise, 80 ms sequential delays.
- One-time viewport reveals: 400 ms fade and 20 px rise; card delays of 60 ms.
- Hover: 180 ms ease-out, 4 px lift and 1.04 image scale; fixed source aspect ratios prevent resizing.
- Heading rules and walkthrough edges: transform-based wipes over 600 ms.
- Entrance easing: cubic-bezier(0.16, 1, 0.3, 1).
- Keyboard-operable native filter buttons expose pressed state and announce result count.
- Active section navigation and smooth anchors. Anchor clearance follows the measured sticky-header height, including wrapped mobile navigation.
- Video stays on its poster until desktop hover or native play controls on touch devices. Offscreen or hidden-tab video pauses; reduced-motion users retain explicit controls.
- Reduced motion cancels entrances and wipes and removes transforms and transition durations. Metrics never count up.
- Mobile navigation wraps; metric band becomes two columns; project cards become one column; walkthrough and Approach cards become one column on narrow screens. The featured image moves ahead of its detailed text.

## QA

The remote update removing repetitive arrows from project links was retained before deployment.

- Production build and route/link/media/state checks pass. GitHub Actions independently recorded performance 97–100, accessibility 100, and best practices 100 across all eleven routes in both modes.
- Lighthouse at 390 px: all eleven routes, both modes, performance 100, accessibility 100, best practices 100.
- Lighthouse desktop: homepage and THOR-5F, both modes, performance 100, accessibility 100, best practices 100, using the official desktop preset.
- Narrow 320 px checks: homepage and validation, both modes, performance 98–100 and accessibility/best practices 100. Navigation wraps at word boundaries.
- Font preloading eliminated the measured layout shift: CLS 0 in these runs.
- Source Serif 4 and Source Sans 3, approved type sizes, weights, 70ch prose measure, spacing tokens, narrow H1 32/38, and OFL notices are retained.
- Print render inspected for the homepage, validation, and capstone; readable black-on-white text, tables, expanded disclosures, figure captions, and video posters.
- Real media and PDF contents remain pending. Their existing paths and manifests are unchanged.

| Mode | Text | Background | Contrast |
|---|---|---|---|
| dark | #E8EDF4 | #070B12 | 16.75:1 |
| dark | #8A97A8 | #070B12 | 6.64:1 |
| dark | #23B5D3 | #070B12 | 8.09:1 |
| dark | #E8EDF4 | #0E141F | 15.68:1 |
| dark | #8A97A8 | #0E141F | 6.21:1 |
| dark | #23B5D3 | #0E141F | 7.57:1 |
| light | #24282b | #faf9f6 | 14.11:1 |
| light | #535b61 | #faf9f6 | 6.57:1 |
| light | #235b73 | #faf9f6 | 7.08:1 |
| light | #24282b | #f0efeb | 12.91:1 |
| light | #535b61 | #f0efeb | 6.01:1 |
| light | #235b73 | #f0efeb | 6.48:1 |

External GitHub and published-paper links resolve. LinkedIn returns HTTP 999 to automated checks and remains manually unverified.

## Files materially changed

`src/components/Home.astro`, `src/components/Figure.astro`, `src/components/LocalVideo.astro`, `src/layouts/Document.astro`, `src/styles/global.css`, `src/data/render.ts`, `src/data/pages.json`, `scripts/check.mjs`, `scripts/audit.mjs`. Lighthouse performance is now included in the existing audit gate.

## Asset supply priority

1. **A01**: Featured study and first project card. `public/figures/thor-5f/thor5f-study-overview-pdf.png`.
2. **A18**: Capstone project card and integrated-platform story. `public/figures/bladder-test-platform/capstone-integrated-test-platform.jpg`.
3. **A02**: Validation rating evidence. `public/figures/thor-5f/thor5f-iso18571-validation-summary.png`.
4. **A03**: Validation response overlays. `public/figures/thor-5f/thor5f-semirigid-validation-overlays.png`.
5. **A31**: Rover project card. `public/figures/payload-and-rover/ubc-uas-rover-assembly.png`.
6. **A14**: Cervical fracture project card. `public/figures/cervical-fracture/me720-ghbmc-model.png`.
7. **A25**: Seat foam project card. `public/figures/seat-foam/me725-seated-sled-model.png`.
8. **A28**: HLI project card. `public/figures/kidney-tissue-classification/HLI_methods_results.png`.
9. **V01**: Rigid Bench FE motion, with poster and MP4 fallback. `public/videos/fe-validation/thor5f-rigid-fe-kinematics.webm`; `public/videos/fe-validation/thor5f-rigid-fe-kinematics.mp4`; `public/videos/fe-validation/thor5f-rigid-fe-kinematics-poster.png`.
10. **V02**: Semi-Rigid Bench FE motion, with poster and MP4 fallback. `public/videos/fe-validation/thor5f-semirigid-fe-kinematics.webm`; `public/videos/fe-validation/thor5f-semirigid-fe-kinematics.mp4`; `public/videos/fe-validation/thor5f-semirigid-fe-kinematics-poster.png`.

The four conceptual SVGs and remaining figures can follow. Supply both replacement PDFs when ready. The existing asset manifest remains authoritative for every exact path and filename.

## Formatting locations

The list below identifies source sections affected by the shared formatting change. Numeric emphasis previously left bold within prose is now plain in its unchanged sentence; values beginning with a number also appear in separate callouts immediately before that sentence. Colon-led labels become standalone metadata elements with their wording retained. Existing tables keep their headings and numerical alignment.

### Patrick Thangarajah | Mechanical & CAE Engineering Portfolio

- At a Glance: standalone metadata labels “Engineering background:”; “Simulation & CAE:”; “Validation & analysis:”; “Design & prototyping:”; “Technical communication:”.
- Resume: standalone metadata labels “Location:”; “U.S. work eligibility:”; “Target areas:”.
- Publications & Presentations: numeric or numeral-containing emphasis removed from “Assessment of Seat Belt Anchor Position on Rear Seat Occupant Kinematics in Frontal Impact Using a Validated THOR-5F Finite Element Model”; “20th Injury Biomechanics Symposium”.
- Publications & Presentations: standalone metadata labels “Public-sharing note:”.
- Contact: standalone metadata labels “Email:”; “LinkedIn:”; “GitHub:”.

### THOR-5F Rear Seat Occupant Safety Research

- Opening: numeric or numeral-containing emphasis removed from “Validated THOR-5F simulation → quantified restraint-geometry effects”.
- Study Overview: numeric or numeral-containing emphasis removed from “104”; “4”; “2”; “10”; “0.71”; “42 to 63 mm”; “35.0 to 49.6 mm”; “17% and 16% below”.
- Study Overview: standalone metadata labels “Tools:”.
- Validation Result: numeric or numeral-containing emphasis removed from “0.71”.
- Design of Experiments: standalone metadata labels “Coordinate convention:”.
- Design of Experiments: numeric or numeral-containing emphasis removed from “27 shoulder anchor cases per bench”; “25 physically feasible lap anchor cases per bench”; “104 LS-DYNA simulations”.
- Engineering Interpretation: standalone metadata labels “Interpretation boundary:”.
- Deliverables: numeric or numeral-containing emphasis removed from “20th Injury Biomechanics Symposium, The Ohio State University”.
- What This Demonstrates: standalone metadata labels “External-sharing boundary:”.

### Quantitative FE Model Validation | ISO 18571

- Opening: standalone metadata labels “Focus:”.
- Decision: standalone metadata labels “Public-sharing boundary:”.

### Seat Belt Anchor DOE & Statistical Analysis

- Opening: standalone metadata labels “Goal:”.
- Experimental Design: standalone metadata labels “Coordinate convention:”.
- Design Boundary: standalone metadata labels “Public-sharing boundary:”.

### LS-PrePost Automation for Simulation Setup

- Opening: standalone metadata labels “Impact:”.
- Tools: numeric or numeral-containing emphasis removed from “LS-PrePost 4.10 • LS-DYNA model preparation • restraint system modeling • LS-PrePost command-file scripting • model QA”.
- Tools: standalone metadata labels “Scope note:”.

### Cervical Fracture Mechanics in Football Impact

- Key Results: numeric or numeral-containing emphasis removed from “2.26 kN at 3.4 m/s”; “2.34 kN at 4.1 m/s”.
- What This Demonstrates: standalone metadata labels “Public-sharing boundary:”.

### Design, Prototyping, and Applied Research

- What This Demonstrates: numeric or numeral-containing emphasis removed from “Mechanical design • CAD • 3D printing • sensors and controls • MATLAB and Arduino • experimental testing • technical troubleshooting • multidisciplinary teamwork”.

### Soft Distensible Bladder Test Platform - UBC Capstone

- Project Scope: numeric or numeral-containing emphasis removed from “Academic capstone, September 2022 to April 2023:”.
- Project Scope: standalone metadata labels “Academic capstone, September 2022 to April 2023:”.
- Client Continuation: numeric or numeral-containing emphasis removed from “R&D Engineer, Echoscope \| Part-time and remote \| 10 May to 8 September 2023”.
- Verification Results: numeric or numeral-containing emphasis removed from “2.2 kPa”; “13.8 second”; “5/5 for timing”; “5/5 for overall function”; “4.5/5 for ease of use”; “3/5 for aesthetics”.
- Important Engineering Decisions: standalone metadata labels “Pressure sensing:”; “Chamber sealing:”; “Material selection:”; “Molding process:”.
- What This Demonstrates: standalone metadata labels “Public-sharing boundary:”.

### Seat Foam Effects on Rear Impact Injury Response

- My Individual Contribution: numeric or numeral-containing emphasis removed from “10 sled simulations”; “HIC15 and Nij”.
- Key Results: numeric or numeral-containing emphasis removed from “700”; “18.3% lower at 57 km/h”; “19.6% lower at 27 km/h”; “1.0”; “1.63”; “1.05”; “0.616”.
- What This Demonstrates: numeric or numeral-containing emphasis removed from “LS-DYNA explicit dynamics \| LS-PrePost \| foam material modeling and verification \| Hybrid III occupant modeling \| contact analysis \| HIC15 and Nij \| simulation post-processing”.
- What This Demonstrates: standalone metadata labels “Public-sharing boundary:”.

### Kidney Tissue Classification Using Deep Learning - HLI Summer Research

- Opening: numeric or numeral-containing emphasis removed from “Summer Research Student \| Centre for Heart Lung Innovation, UBC \| Summer 2022”.
- Project Links: standalone metadata labels “Public-sharing boundary:”.

### Payload System and Rover Prototyping - UBC UAS

- Opening: numeric or numeral-containing emphasis removed from “Payload Team Member \| UBC Unmanned Aircraft Systems \| Sep 2019-May 2021”.
- Competition Design Problem: numeric or numeral-containing emphasis removed from “30 m”.
- My Individual Contribution: numeric or numeral-containing emphasis removed from “50%”.
- Result: numeric or numeral-containing emphasis removed from “50%”.
- What This Demonstrates: numeric or numeral-containing emphasis removed from “SolidWorks and Onshape, component design, packaging, 3D-print preparation, prototype testing, design iteration, and multidisciplinary teamwork”.
- What This Demonstrates: standalone metadata labels “Public-sharing boundary:”.

Homepage structure also changes at the hero, metric band, Selected work, featured walkthrough, contribution callout, Engineering Approach, Technical toolkit, Education, all six Experience rows, Contact, and Resume & portfolio. Project heading rules and figure borders change across all ten project pages.
