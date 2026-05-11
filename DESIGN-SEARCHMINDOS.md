---
project: Searchmind Agency OS
domain: Internal CRM & operations system for performance marketing agency
language: Danish (UI copy)
version: 0.1 — derived from prototype (Searchmind CRM.html)
Overview
Searchmind's design language is calm, dense, and editorial — a working tool, not a marketing surface. The system runs on a near-white canvas with low-chroma neutrals, one saturated brand violet reserved for primary action and identity, and a small palette of semantic and departmental hues that are consciously aligned in lightness and chroma so they read as a family rather than as competing accents.
The chrome is quiet: a hairline-bordered sidebar, a 52px topbar with a breadcrumb instead of a page title, and cards that rely on a single 1px border and `--sh-sm` rather than heavy elevation. Density is the brand. The default mode is `compact` — 32px buttons, 36px rows, 13.5px body — built for power users who live in the app for eight hours a day. A `spacious` density mode is the only escape valve.
What makes the system distinctive is the discipline of its color. Every chroma value across brand, semantic, and departmental tokens is tuned in OKLCH so swatches share a perceptual lightness band — `0.14–0.20` chroma, `54–70%` lightness — and read as a coherent set even though they span violet, magenta, green, amber, and red. Color is information, not decoration: a status dot, a department spine, a margin trend. The interface earns its visual interest from typographic rhythm and tabular data, not from gradients or illustrative flourishes.
Key Characteristics
OKLCH-first palette. Every color token is authored in OKLCH so lightness/chroma stay coordinated across brand, semantic, and dept hues; perceptual neighbors (e.g. PPC magenta vs. Creative red) are deliberately spaced.
One brand color, used scarcely. `--brand` (violet, hue 272) carries primary CTAs, the active nav rail, the avatar mark, and tweakable accent. Everything else is neutral.
Geist + Geist Mono. A single sans family for UI; mono is reserved for tabular numbers (`tnum`), keyboard hints, and timer readouts — never for body copy.
Tabular data is a first-class surface. `.mono.num` with `font-variant-numeric: tabular-nums` is applied to every metric, score, percentage, and timer so columns align without fixed-width hacks.
Density mode (`compact` ⇄ `spacious`) is a real toggle, not a setting nobody touches. Compact is default; spacious is exposed in Tweaks for users who want larger touch targets.
Sidebar is a nav rail with grouped sections (Forretning / Arbejde / Kunde / Organisation), collapsible to 56px icon-only.
Status is communicated through chips, not banners. Health, status, and severity all collapse into a single 22px chip vocabulary (`.chip-ok`, `.chip-warn`, `.chip-bad`, `.chip-brand`).
Charts are inline and small. 32px sparklines next to KPIs, 6px progress bars in tables, allocation bars at 10px. The full-fat chart is the exception, not the default.
Colors
> All tokens live in `styles.css` under `:root`. Dark theme overrides are applied via `[data-theme="dark"]`. The brand hue (`272`) is **tweakable at runtime** via the Tweaks panel and is rewritten as a CSS custom property on `<html>`.
Brand
Brand (`--brand`) — `oklch(54% 0.20 272)` — Saturated violet. The single accent that carries identity. Used for primary buttons, the active nav indicator, the brand mark in the sidebar logo, focus rings, and the timer-running pill.
Brand Hover (`--brand-hover`) — `oklch(48% 0.22 272)` — Slightly darker, slightly more saturated. Hover/pressed state for primary buttons.
Brand Soft (`--brand-soft`) — `oklch(95% 0.03 272)` — Pale violet wash. Background of `.chip-brand`, soft selected states, and the brand-tinted timer pill when the timer is running.
Brand Border (`--brand-border`) — `oklch(88% 0.06 272)` — Hairline that pairs with `brand-soft` to keep the chip readable on white canvas.
Brand FG (`--brand-fg`) — `oklch(100% 0 0)` (pure white in light, near-black in dark) — Foreground color used on top of `--brand`. Inverts under dark mode so the brand remains the figure, not the ground.
Surface (Neutrals)
The neutral ramp uses a barely-perceptible cool-warm hybrid (hue `260`, chroma `0.003–0.018`) so the UI looks neutral but never reads as flat sRGB gray.
Bg (`--bg`) — `oklch(99% 0.003 260)` — Default page background.
Bg Elev (`--bg-elev`) — `oklch(100% 0 0)` — Cards, topbar, dropdowns. The figure that sits on top of `--bg`.
Bg Sunken (`--bg-sunken`) — `oklch(97% 0.004 260)` — Sidebar, segmented-control backgrounds, table headers. Reads as "below" the page.
Bg Hover (`--bg-hover`) — `oklch(95.5% 0.006 260)` — Hover state on neutral buttons and rows.
Bg Active (`--bg-active`) — `oklch(93% 0.01 265)` — Pressed state.
Border (`--border`) — `oklch(91% 0.006 260)` — Default 1px hairline. Cards, inputs, dividers.
Border Strong (`--border-strong`) — `oklch(85% 0.01 260)` — Used on hover and for emphasized separators.
Border Subtle (`--border-subtle`) — `oklch(94% 0.005 260)` — Tertiary dividers inside cards (e.g. footer of NPS hover card).
Text
Three text roles only — no fourth "muted-muted". Body copy is `--text`; secondary metadata is `--text-muted`; placeholder/timestamp/empty-state is `--text-faint`.
Text (`--text`) — `oklch(22% 0.015 265)` — Body, headlines, primary numbers.
Text Muted (`--text-muted`) — `oklch(48% 0.015 265)` — Labels, breadcrumb crumbs that aren't current, secondary cell text.
Text Faint (`--text-faint`) — `oklch(62% 0.012 260)` — Timestamps, counts in nav, helper hints, sparkline axis numbers.
Semantic
All three semantic colors share `chroma 0.14–0.19` and lightness ~`58–70%` so they balance optically when stacked in the same row.
Token	Light	Soft	Border	Use
OK (`--ok`)	`oklch(58% 0.14 155)`	`--ok-soft`	`--ok-border`	Healthy clients, on-budget util bars, positive deltas, status="active" dot
Warn (`--warn`)	`oklch(70% 0.15 75)`	`--warn-soft`	`--warn-border`	At-risk clients, status="paused", utilisation 90–100%, mid-range NPS
Bad (`--bad`)	`oklch(58% 0.19 25)`	`--bad-soft`	`--bad-border`	Over-budget, negative margin, NPS below 40, delete actions
Each semantic token comes as a triplet: `--ok` (the line/icon color), `--ok-soft` (the chip background), `--ok-border` (the chip hairline). Always use the triplet together — chips are unreadable when the soft background sits on the wrong border.
Department Hues
Seven hues, all locked to `oklch(60% 0.16 H)` so they are perfectly equiluminant. The hue spacing is intentional — no two departments occupy adjacent hue regions.
Token	Hue	Department
`--dep-seo`	255	SEO (cool blue)
`--dep-ppc`	320	PPC (magenta)
`--dep-social`	30	Paid Social (warm orange)
`--dep-email`	180	E-mail (teal)
`--dep-geo`	135	GEO (green)
`--dep-creative`	355	Creative (pink-red)
`--dep-content`	85	Content (yellow-green)
Department hues are used as: a 6–8px square in `<DeptDot>`, a chip background mixed at 10% via `color-mix(in oklch, ${color} 10%, var(--bg-elev))` for `<DeptChip>`, and as the segment fill of `<AllocationBar>`. Never use a dept hue for a non-departmental concept — it will read as wrong taxonomy.
Dark Mode
Activated via `[data-theme="dark"]` on `<html>`. The dark palette is not an inversion — lightness values are independently tuned: bg drops to `18%`, elev rises to `22%`, text climbs to `95%`, and brand lightness rises to `68%` so it stays readable on the darker canvas. Shadows in dark mode use much higher alpha (0.30–0.60) because elevation has to compete with the darker background.
Typography
Font Family
Geist — `"Geist", ui-sans-serif, system-ui, sans-serif`. Variable-weight sans, used at weights 400 / 500 / 600 / 700. Loaded from Google Fonts; the system font fallback chain handles offline cases gracefully.
Geist Mono — `"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace`. Used only for: tabular numbers (`.mono.num` enables `font-variant-numeric: tabular-nums`), keyboard hints (`.kbd`), timer readouts, NPS scores, and timestamps inside hover cards. Never used to set running prose.
Body uses `letter-spacing: -0.005em` and `-webkit-font-smoothing: antialiased` to compensate for Geist's slightly open default tracking on light backgrounds.
Hierarchy
The system runs at smaller sizes than typical SaaS because the product is a working tool with a high information density.
Role	Size	Weight	Where it appears
Page title (`h1`)	22px	600	Top of each screen (e.g. "Kunder", "Workload") with `-0.02em` tracking
KPI value	22px	600	Big number in `<KpiCard>`, `.mono.num`
NPS hover card value	22px	600	Latest score and 6-month average inside `<NpsHoverCard>`
Card title	16px	600	Section title inside cards (e.g. "Smart alerts")
Body	13.5px	400	Default running text — set on `<body>`
Sidebar nav item	13px	400 (500 active)	Items in the left nav
Button	13px	500	Primary, secondary, ghost — all share the same 13px / 500
Input	13px	400	Form fields
Cell text	12.5–13px	400	Table rows, list cards
Label	11.5–12.5px	500	Inline labels, caption above a value
Section label	10.5px	600	Uppercase, `letter-spacing: 0.06em`, `--text-faint` — taxonomy markers
Chip	11.5px	500	Status, health, dept, brand chips
Caption / kbd	10.5–11px	400	Timestamps, kbd hints
Principles
Weight before size. A 13.5px body line and a 13px button differ by half a pixel; the visible difference is the 100-step weight jump. Hierarchy comes from the weight axis.
Tabular numbers everywhere they could shift. Any number that lives next to another number (KPI deltas, time entries, retainer amounts, NPS scores) gets `.mono.num`. Inconsistent column edges erode trust in the data.
`.section-label` is taxonomy, not heading. Use it to mark the type of a piece of content ("Seneste", "Gns. seneste 6 mdr"), not to set a section title. Real titles are 16–22px / 600.
Negative tracking on display only. The `h1` page title pulls `-0.02em`; cells and labels stay near zero. Don't carry display tracking down into body.
Mono earns its place via numerals. Switch to mono only when the digit grid matters. A unit suffix ("kr", "t", "%") inside a `.mono.num` span is fine; full sentences in mono are not.
Spacing & Layout
Spacing System
The system uses a density-driven spacing scale. Three CSS custom properties (`--pad-row`, `--pad-card`, `--gap`) shift between two density modes; everything else uses raw px.
Token	Compact (default)	Spacious
`--pad-row`	`8px 12px`	`14px 16px`
`--pad-card`	`16px`	`24px`
`--gap`	`12px`	`20px`
`--h-row`	`36px`	`48px`
Beyond the density tokens, the most common raw values you'll see in the prototype are:
4 / 6 / 8 / 10 / 12 / 16 / 20 / 24 / 32 / 48 — an 8-ish-base scale, but with intentional half-steps (`6`, `10`, `14`) where a sidebar item or a chip needs to feel a little tighter than the standard step.
Chip pad `2px 8px`, height `22px`.
Button pad `0 12px`, height `32px` (default) / `26px` (sm) / `30px` (topbar).
Topbar height `52px` — fixed, doesn't change with density.
Sidebar width `220px` expanded / `56px` collapsed, transitions in 0.18s `cubic-bezier(.2,.7,.2,1)`.
Layout Skeleton
```
┌────────────────────────────────────────────────────────────────────┐
│  ┌──── Sidebar ────┐  ┌──── Topbar 52px ─────────────────────────┐ │
│  │ Brand           │  │ Breadcrumb · Search · External · Timer  │ │
│  │ ─ Forretning    │  ├──────────────────────────────────────────┤ │
│  │   Agency Pulse  │  │                                          │ │
│  │   Kunder        │  │           <main> overflow:auto           │ │
│  │   Kontrakter    │  │              padding: 24px               │ │
│  │ ─ Arbejde       │  │                                          │ │
│  │   Opgaver       │  │                                          │ │
│  │   …             │  │                                          │ │
│  │ ─ Kunde         │  │                                          │ │
│  │ ─ Organisation  │  │                                          │ │
│  │                 │  │                                          │ │
│  │ Profile         │  │                                          │ │
│  └─────────────────┘  └──────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```
The shell is a flex row: `<Sidebar>` is fixed-width and non-shrink, the right pane is `flex:1` with its own internal column (`<Topbar>` + `<main>`). Only `<main>` scrolls; the sidebar and topbar stay sticky.
Whitespace Philosophy
White space is structural, not decorative. Cards sit `12px` apart; KPIs `12px` apart; tables compress to 36px rows. The breathing room a typical SaaS page would put between sections is delivered here through density tokens and 1px hairlines instead. When something needs more weight, it gets a card border, not a margin.
Elevation
Level	Token	Treatment	Use
0	—	Flat: 1px `--border` on `--bg-elev`	The default. Cards, sidebar, topbar.
1	`--sh-sm`	`0 1px 2px oklch(0% 0 0 / 0.04)`	Active nav button, active tab in segmented controls, faint hover lift
2	`--sh-md`	`0 4px 12px ..., 0 1px 2px ...`	Tooltips, dropdowns, light overlays
3	`--sh-lg`	`0 12px 40px ..., 0 2px 6px ...`	Tweaks panel, time-track overlay
4	`--sh-pop`	`0 20px 60px ..., 0 2px 8px ...`	NPS hover card, modals, command palette
The system is shadow-sparing by design — most surfaces are differentiated by a 1px hairline and a 1–4% lightness step on the background, not by a shadow. The four shadow levels above are reserved for things that genuinely float (hover cards, panels, modals).
Shape
Border Radius
Token	Value	Use
`--r-xs`	4px	kbd hints, small tags
`--r-sm`	6px	buttons, inputs, inline pill backgrounds
`--r-md`	8px	dropdown menus, tooltips, hover cards
`--r-lg`	12px	cards (default `<.card>` radius)
`--r-xl`	16px	panel containers (Tweaks, time-track overlay)
`--r-2xl`	20px	full-page modals (rare)
`999px`	pill	status chips, health chips, dept chips, avatar ring outline
The brand mark in the sidebar uses a 6px radius (`--r-sm`) — a deliberate, slightly sharper corner than the 12px cards around it, so the logo reads as a logo and not as a card with a letter inside.
Components
Buttons
`.btn` — The default neutral button. 32px tall, 12px horizontal padding, 6px radius, 1px `--border`, `--bg-elev` background, weight 500.
`.btn-primary` — `--brand` background, `--brand-fg` text, no border. Hovers to `--brand-hover`. The only primary button on a screen at a time.
`.btn-ghost` — Transparent background and border, `--text-muted` text. Hovers to `--bg-hover` with `--text` text. Used in topbar, table row actions, breadcrumb navigation.
`.btn-icon` — 32px square version of any of the above (no horizontal padding). Used for theme toggle, sidebar collapse, notification bell.
`.btn-sm` — Modifier: 26px tall, 12px font, 8px horizontal padding. Used inside cards where the parent already provides padding.
Transitions are explicit: `background 0.12s, border-color 0.12s, color 0.12s`. No transform-on-hover. No glow.
Chips
`.chip` — 22px-tall pill, 11.5px / weight 500, 6px horizontal padding, 6px gap to its `.dot` (a 6px circle in the chip's foreground color).
Variants compose surface + border + text from a single semantic triplet:
`.chip-ok` — `--ok-soft` / `--ok-border` / `--ok`
`.chip-warn` — `--warn-soft` / `--warn-border` / `--warn`
`.chip-bad` — `--bad-soft` / `--bad-border` / `--bad`
`.chip-brand` — `--brand-soft` / `--brand-border` / `--brand`
Three task-specific chip components are built on top of `.chip`:
`<HealthChip health>` — `ok` ⇄ `warn` ⇄ `bad`, with default Danish labels ("Sund", "Advarsel", "Kritisk") that consumers can override.
`<StatusPill status>` — `active` (green, animated pulse) / `paused` (amber, static) / `inactive` (faint gray, static). A `compact` mode renders just the 8px dot inside a `<Tooltip>` for use in tight cells.
`<DeptChip id>` — Department-tinted chip; surface mixed at 10% in OKLCH from the dept hue, border at 25%, text at full saturation.
Cards
`.card` — `--bg-elev` background, 1px `--border`, `--r-lg` (12px) radius. No shadow by default.
`.card-pad` — Adds `--pad-card` of interior padding. Use as a separate class so a card can choose to host a header that bleeds to the edge.
KPI cards (`<KpiCard>`) follow the same shape and compose: a `.section-label` for the metric name, a 22px / weight 600 `.mono.num` for the value, a `<Delta>` chip for change, and a `<Sparkline>` (32px tall) for trend.
Avatars
`<Avatar person size>` — Round avatar, default 24px. Background is `oklch(62% 0.15 ${person.hue})` so each person has a stable color derived from a hue stored on their record. `--brand-fg` text. A 1.5px `--bg-elev` ring lets the avatar sit on any surface without losing its silhouette.
`<AvatarStack people max>` — Horizontal stack with `-6px` margin between avatars; an `+N` neutral avatar caps the stack when overflowed.
The agency only uses initials (`LM`, `MK`, `AS`) — no photo avatars. Color + initial is the identity.
Form Fields
`<TextField>` — 32px tall, 6px radius, 1px `--border`, `--bg-elev`, supports leading icon (12–14px), placeholder text, and a trailing `<.kbd>` hint. The component is an inline-flex container around a borderless `<input>` so the border can stay on the wrapper and never collide with browser autofill chrome.
Focus is communicated via the global `:focus-visible` ring — a 2px `--brand` outline with 2px offset. Borders don't change on focus.
Tabs (Segmented Control)
`<TabGroup tabs active>` — A 28px-tall segmented control with `2px` internal padding, `--bg-sunken` track, and the active tab raised to `--bg-elev` with `--sh-sm` and a 1px `--border`. Active label is weight 600; inactive is 500 / `--text-muted`. Each tab can carry an optional leading icon and a trailing count.
Tooltips & Hover Cards
`<Tooltip>` — Black-on-light reverse-contrast: `--text` background, `--bg-elev` text, 11.5px, `--sh-md`, 4px radius, 6px above/below the trigger. No arrow.
`<NpsHoverCard>` — Full hover card (260px wide) with `--sh-pop` and `--bg-elev`; shows latest score, 6-month average, full sparkline, and survey interval. Reserved for data dense enough to deserve a card.
Charts
The system has three inline chart primitives — all small, all line-art:
`<Sparkline data width=120 height=32>` — A single SVG path with optional 15%-opacity fill area, optional last-point marker. Stroke color is set by the parent (semantic tokens or department hues). No axes, no labels.
`<UtilBar hours budget>` — A 6px progress bar that turns `--ok` → `--warn` (>90%) → `--bad` (>100%), and overlays a 45° red-on-pink stripe pattern for the "over budget" portion. The stripe pattern is the brand's signature for "you're past the line".
`<AllocationBar allocation>` — A 10px stacked horizontal bar segmented by department hues, used to show how a client's hours are split. Hovering a segment shows `dept: pct%` via the native `title` attribute.
For multi-series charts (utilisation trend, profitability), build on top of inline SVG with the same color tokens — never reach for a chart library.
Time Display
`.kbd` — Inline keyboard hint, 18×18px (min), `--bg-sunken` with `--border`, mono 10.5px. Used for `⌘K`, `T`, `→`, etc. Always inside a parent that gives it real meaning ("Søg eller hop til… ⌘K").
The global timer in the topbar uses the brand-soft pill treatment when running: `--brand-soft` background, `--brand-border` border, `--brand` text + dot. The dot is animated via the `.pulse-dot` keyframe (1.6s ease-in-out, expanding `box-shadow`).
Sidebar Nav
Each nav item is a 30px-tall flex row with a 15px icon, 13px label, optional trailing count (rendered in `.mono.num`). The active state lifts the item to `--bg-elev` with a 1px `--border` and `--sh-sm` — the same surface treatment as the active tab in `<TabGroup>`, so the visual vocabulary for "selected" is consistent across nav and tabs.
Group headers are `.section-label`s with `10px 10px 4px` padding. Groups are: Forretning, Arbejde, Kunde, Organisation — in that order, top-to-bottom.
Breadcrumb
The topbar breadcrumb is a flat sequence of spans separated by a 12px `<ChevronR>` icon. The last crumb is 14px / weight 600 / `--text`; previous crumbs are 13px / weight 400 / `--text-muted`. No clickable behavior on the last crumb — it represents "you are here", not a link.
Patterns
Density Mode
`[data-density="compact"]` (default) and `[data-density="spacious"]` are set on `<html>` from a Tweaks toggle. Tables, forms, and cards reach for `--pad-row`, `--pad-card`, and `--h-row` instead of hard-coded values, so toggling density restyles the whole app without re-rendering.
Theme Mode
`[data-theme="light"]` (default) / `[data-theme="dark"]`, also set on `<html>`. The theme toggle in the topbar (`Sun` / `Moon` icon) flips the attribute; the dark palette in `:root[data-theme="dark"]` does the rest. Both modes ship the same shadow tokens by name but with different alpha values, so any consumer that reaches for `--sh-md` Just Works.
Brand Hue Tweak
The Tweaks panel exposes a hue slider (0–360°) that rewrites the four `--brand-*` custom properties at runtime. The chroma and lightness stay locked; only the hue rotates. This means the user can re-skin the entire app with a single value without breaking contrast — and it's why every brand color is authored in OKLCH rather than as a hex.
Status Vocabulary (combined)
A client carries both a status (`active` / `paused` / `inactive` — operational state) and a health (`ok` / `warn` / `bad` — risk signal). They render as separate chips in the client header. Don't collapse them into one; they answer different questions.
Empty States & Counts
When a nav item has a count (Kunder · 18, Kontrakter · 12), the count is rendered in `.mono.num` at 11px in `--text-faint`, anchored to the right edge of the row. Empty states use the same numeric treatment with the value `0` — never an em-dash.
Localization
UI copy is Danish-first. Number formatting uses `Intl.NumberFormat('da-DK')`; dates use `da-DK` long-month abbreviations ("18 apr 2026"). Currency is suffixed (`72 000 kr`) rather than prefixed; compact form drops to `72K kr` / `1.1M kr`. Hours are suffixed `t` ("46.5 t"). Percentages omit the space ("31%").
Status, health, and chip labels are all Danish:
Concept	OK	Warn	Bad
Health	Sund	Advarsel	Kritisk
Status (active/paused/inactive)	Aktiv	Pauseret	Inaktiv
Margin trend	Positiv	—	Negativ
Department names: SEO, PPC, Paid Social, E-mail, GEO, Creative, Content. Don't translate "SEO" / "PPC" / "GEO" — they're industry terms in Danish too.
Do's and Don'ts
Do
Use `--brand` for the single primary action on a screen. Everything else is a `.btn` or `.btn-ghost`.
Use `.mono.num` for any number that lives in a column or next to another number.
Compose chips from a triplet (`-soft` background + `-border` border + main as text). Mixing soft + a different border breaks the chip.
Reach for the dept hue tokens (`--dep-*`) only for departmental data. Use semantic tokens (`--ok` / `--warn` / `--bad`) for everything else.
Treat density and theme as first-class — read `--pad-row`, `--pad-card`, `--gap` instead of hard-coding spacing on tables and cards.
Use 1px `--border` and `--bg-elev` to mark surfaces. Add a shadow only when the element actually floats above the canvas (overlay, popover, modal).
Author new colors in OKLCH at chroma `0.14–0.20`, lightness `54–70%`, so they sit in the existing palette family.
Don't
Don't add a fourth text role. If something feels too dim, increase the size or weight, don't introduce a new gray.
Don't use `--brand` as a decorative tint. The brand color carries action, not visual interest.
Don't reach for a chart library — `<Sparkline>`, `<UtilBar>`, `<AllocationBar>`, plus inline SVG, cover every chart in the system.
Don't mix dept hues with semantic colors in the same legend. They mean different things and look wrong together.
Don't use mono for body copy. Mono signals "this is data". A paragraph of mono signals "I gave up on hierarchy".
Don't introduce drop shadows on default cards. The 1px hairline is the elevation.
Don't use emoji as iconography. The system has a hand-drawn `<Icons>` set; missing icons get added there.
Don't collapse `status` and `health` into one chip. They are independently meaningful.
Don't introduce a colored border or fill for focus. Focus is the global 2px `--brand` outline at 2px offset, period.
Iteration Guide
Color first, component second. When introducing a new state, decide whether it's `ok` / `warn` / `bad` / `brand` or a department hue before picking a component. The semantic decision drives everything else.
Compose from `styles.css` atoms. `.card`, `.chip`, `.btn`, `.kbd`, `.section-label`, `.mono.num`, `.divider-v` cover ~80% of any new screen. Reach for them before writing inline styles.
Density-test every new layout. Toggle `[data-density="spacious"]` and confirm the layout breathes. If a row breaks, switch raw `8px` to `var(--pad-row)`.
Dark-mode-test. Toggle `[data-theme="dark"]`. If a custom shadow disappears, you're using a hard-coded `rgba(0,0,0,…)` instead of `--sh-md` / `--sh-pop`.
Numbers go in `.mono.num`. Always.
One brand action per screen. If you need two, one of them is actually a `.btn` (secondary).
Before adding a new color, count how many you have. If you can't justify it as a sibling of an existing semantic or dept token, it doesn't belong.