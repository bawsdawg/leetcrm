/**
 * Mock knowledge base — aligns with Mongo `KnowledgeArticle`
 * (slug, title, summary, bodyMd, tags, audience, published).
 */

export const KNOWLEDGE_CATEGORIES = [
  {
    id: "onboarding",
    name: "Onboarding",
    short: "ONB",
    description: "90 dage · hub & ritualer",
    deptHue: 272,
  },
  {
    id: "playbook",
    name: "Playbooks & SOP",
    short: "SOP",
    description: "Leverancer på tværs af discipliner",
    deptHue: 155,
  },
  {
    id: "tooling",
    name: "Værktøjer",
    short: "TLS",
    description: "Stack, integrationer, shortcuts",
    deptHue: 260,
  },
  {
    id: "security",
    name: "Sikkerhed",
    short: "SEC",
    description: "GDPR, adgang, secrets",
    deptHue: 25,
  },
  {
    id: "commercial",
    name: "Kommercielt",
    short: "COM",
    description: "Tilbud, SLA, pricing",
    deptHue: 75,
  },
  {
    id: "brand",
    name: "Brand & voice",
    short: "BRN",
    description: "Tekst, visuel identitet, QA",
    deptHue: 290,
  },
];

/** @type {{ slug: string; title: string; summary: string; bodyMd: string; categoryId: string; tags: string[]; audience: 'internal' | 'client' | 'public'; authorId: string; updatedAt: string; published: boolean; readingMinutes: number; featured?: boolean }[]} */
export const KNOWLEDGE_ARTICLES = [
  {
    slug: "agency-os-hub",
    title: "Sådan bruger du Agency OS-hubben",
    summary: "Navigation, søgning og roller — ét sted for arbejdet.",
    bodyMd: `## Formål

Hubben samler Pulse, kunder, opgaver og vidensbasen. Alt der kan måles, ligger tæt på navigationslinjen.

## Daglig rytme

- Morgen: Pulse → eskalationer
- Leverance: Opgaver board + tid
- Ugens afslutning: Workload + kapacitet

### Tips

Brug genveje i topbaren hvor de findes. Ved tvivl: spørg i #agency-os på Slack (mock).`,
    categoryId: "onboarding",
    tags: ["hub", "navigation", "ritual"],
    audience: "internal",
    authorId: "lm",
    updatedAt: "2026-05-04",
    published: true,
    readingMinutes: 4,
    featured: true,
  },
  {
    slug: "client-handover-checklist",
    title: "Account handover — tjekliste",
    summary: "Når konto skifter ejer: data, forventninger, risiko.",
    bodyMd: `## Før mødet

- Gennemgå kontrakt + margin i CRM
- Eksporter seneste NPS + åbne opgaver
- Book 45 min med kunde + gammel + ny lead

## Under mødet

- Bekræft OKR og kommunikationskanal
- Gennemgå budget og eskalationssti

## Efter

Opdater owner i CRM og post kort notat i knowledge (mock log).`,
    categoryId: "playbook",
    tags: ["account", "handover", "crm"],
    audience: "internal",
    authorId: "lm",
    updatedAt: "2026-04-28",
    published: true,
    readingMinutes: 6,
    featured: true,
  },
  {
    slug: "nps-wave-playbook",
    title: "NPS-bølge — standardforløb",
    summary: "Skabeloner, timing og triage af svar.",
    bodyMd: `## Udsendelse

Brug godkendte e-mail-skabeloner fra NPS-modulet. Varsle account lead tre dage før.

## Triage

- Promoter: åbn referral-loop
- Passiv: planlæg quick win
- Detraktor: QBR indenfor 10 hverdage

### Måling

Svarfrekvens og median svartid følger seneste runde i Pulse (demo data).`,
    categoryId: "playbook",
    tags: ["nps", "cs", "email"],
    audience: "internal",
    authorId: "mk",
    updatedAt: "2026-05-02",
    published: true,
    readingMinutes: 5,
    featured: true,
  },
  {
    slug: "time-tracking-policy",
    title: "Tidsregistrering — retningslinjer",
    summary: "Billable vs. intern, granularitet, godkendelse.",
    bodyMd: `## Granularitet

Post i blokke ≥ 15 minutter. Brug korrekt kunde og opgave-link.

## Intern tid

Internt standup og overhead markeres uden kunde. Målet er < 20% af ugen for specialister.

## Godkendelse

Account director spot-tjekker uge 48–52 i mock-kalenderen (erstattes af approval flow).`,
    categoryId: "playbook",
    tags: ["tid", "policy", "billable"],
    audience: "internal",
    authorId: "as",
    updatedAt: "2026-03-19",
    published: true,
    readingMinutes: 4,
  },
  {
    slug: "seo-delivery-sop",
    title: "SEO leverance — SOP (kvartal)",
    summary: "Audit, anbefalinger, opfølgning i board.",
    bodyMd: `## Fase 1 — Audit

Core Web Vitals, indeksering, teknisk gæld.

## Fase 2 — Roadmap

Prioritér quick wins vs. strategiske initiativer. Alt logges som opgaver.

## Fase 3 — Review

Kunde-SLA: status inden for 5 hverdage efter deadline (mock).`,
    categoryId: "playbook",
    tags: ["seo", "sop", "delivery"],
    audience: "internal",
    authorId: "as",
    updatedAt: "2026-04-12",
    published: true,
    readingMinutes: 7,
  },
  {
    slug: "ppc-qbr-template",
    title: "PPC QBR — slide-skabelon",
    summary: "Struktur til kvartalsgennemgang med kunden.",
    bodyMd: `## Agenda (45 min)

1. Resultater vs. mål
2. Eksperimenter & læring
3. Budget næste kvartal
4. Risici

## Datakilder

Merchant Center, GA4, CRM margin — alt linkes i appendix.

### Output

Efter møde: opdater kontraktnoter + opret opfølgende opgaver.`,
    categoryId: "commercial",
    tags: ["ppc", "qbr", "slides"],
    audience: "internal",
    authorId: "mk",
    updatedAt: "2026-04-30",
    published: true,
    readingMinutes: 5,
  },
  {
    slug: "stack-next-mongo",
    title: "Udviklerstack — Next.js & Mongo",
    summary: "Repo-struktur, auth, miljøvariabler.",
    bodyMd: `## Monorepo

CRM-kilde ligger i dette repo. Læs \`AGENTS.md\` før du pusher.

## Auth

NextAuth — provider og sessions beskrives i \`/api/auth\`.

## Data

Mock i \`lib/crm/*\` — erstat med Mongoose-modeller ved cutover.`,
    categoryId: "tooling",
    tags: ["nextjs", "mongo", "dev"],
    audience: "internal",
    authorId: "ns",
    updatedAt: "2026-05-06",
    published: true,
    readingMinutes: 6,
  },
  {
    slug: "resend-transactional",
    title: "Resend — transactional mail",
    summary: "Afsendelse, domæner, fejlhåndtering.",
    bodyMd: `## Opsætning

Verificér afsenderdomæne i Resend-dashboardet. API-nøgle kun i server-miljø.

## Retry

 backoff ved 429 — se intern runbook i #email-ops.

### QA

Alle skabeloner gennemgås på mobil før launch.`,
    categoryId: "tooling",
    tags: ["resend", "email", "api"],
    audience: "internal",
    authorId: "kh",
    updatedAt: "2026-02-14",
    published: true,
    readingMinutes: 3,
  },
  {
    slug: "gdpr-client-data",
    title: "GDPR — behandling af kundedata",
    summary: "Formål, retention, dokumentation til DPA.",
    bodyMd: `## Roller

Agency er behandler efter aftale — kunden er ansvarlig.

## Retention

CRM-historik: standard 36 måneder efter kontraktudløb medmindre andet aftales.

### Anmodning om sletning

Esaler til legal@ (mock). Log i ticket-system.`,
    categoryId: "security",
    tags: ["gdpr", "compliance"],
    audience: "internal",
    authorId: "lm",
    updatedAt: "2026-01-22",
    published: true,
    readingMinutes: 8,
  },
  {
    slug: "secrets-rotation",
    title: "API-nøgler — rotation",
    summary: "Kvartalsvis review af integration secrets.",
    bodyMd: `## Scope

Betaling, e-mail, analytics, ad-konti.

## Proces

1. Liste i 1Password vault "Agency-prod"
2. Rotér efter leverandør-guide
3. Opdater CI og Vercel env

Hold changelog i wiki (mock).`,
    categoryId: "security",
    tags: ["secrets", "infra"],
    audience: "internal",
    authorId: "rn",
    updatedAt: "2026-03-03",
    published: true,
    readingMinutes: 4,
  },
  {
    slug: "tone-of-voice-da",
    title: "Tone of voice — dansk bureau",
    summary: "Klar, konkret, menneskelig — uden jargon.",
    bodyMd: `## Principper

- Brug aktiv form
- Korte afsnit
- Konkrete tal fremfor “mange” eller “hurtigt”

## Undgår

Buzzwords og tomme lovninger — kunden skal kunne eksekvere.

### Godkendelse

Content drafts > 800 ord går gennem second pair of eyes.`,
    categoryId: "brand",
    tags: ["copy", "brand", "da"],
    audience: "internal",
    authorId: "es",
    updatedAt: "2026-04-08",
    published: true,
    readingMinutes: 5,
  },
  {
    slug: "visual-identity-quickref",
    title: "Visuel identitet — quick reference",
    summary: "Tokens, kontrast, mørk mode.",
    bodyMd: `## Farver

Brug design tokens fra \`DESIGN.md\` / globals — ingen løsøre-hex i komponenter.

## Typografi

Geist til UI, mono til tal og tidsstempler.

### QA Figma → kode

Tjek afstande mod 8pt-grid og frosty borders mod produktion.`,
    categoryId: "brand",
    tags: ["design", "tokens", "qa"],
    audience: "internal",
    authorId: "iv",
    updatedAt: "2026-05-01",
    published: true,
    readingMinutes: 4,
  },
  {
    slug: "client-facing-status-page",
    title: "(Kunde) Statusside — tekst til portal",
    summary: "Neutral dansk ved incident eller planlagt vindue.",
    bodyMd: `## Struktur

1. Hvad er påvirket
2. Hvad gør vi
3. Tidsestimat / næste update

Tone: rolig, faktabaseret — ingen jargon.

Denne variant er markeret til \`audience: client\` i skemaet.`,
    categoryId: "commercial",
    tags: ["kunde", "status", "comms"],
    audience: "client",
    authorId: "jl",
    updatedAt: "2026-04-02",
    published: true,
    readingMinutes: 3,
  },
  {
    slug: "knowledge-contribution-guide",
    title: "Sådan skriver du en wiki-artikel",
    summary: "Overskrifter, tags, review — før du publicerer.",
    bodyMd: `## Skabelon

Start med \`##\` sektioner. Hold sætninger under 25 ord når muligt.

## Tags

3–5 tags: disciplin + emne + artefakt (fx seo, audit, template).

## Review

Owner = forfatter. Peer review af playbooks før "published=true".`,
    categoryId: "onboarding",
    tags: ["wiki", "meta", "howto"],
    audience: "internal",
    authorId: "pe",
    updatedAt: "2026-05-07",
    published: true,
    readingMinutes: 4,
  },
  {
    slug: "fy26-hiring-brief-draft",
    title: "[Kladde] FY26 — hiring brief",
    summary: "Intern strateginote — ikke klar til publicering.",
    bodyMd: `## Baggrund

Kapacitetsloft i PPC og SEO — behov for 2 FTE i H2.

## Status

Afventer ledelse. Ingen ekstern deling.

### Næste skridl

Finalize budget i majmøde.`,
    categoryId: "commercial",
    tags: ["hiring", "draft", "planning"],
    audience: "internal",
    authorId: "lm",
    updatedAt: "2026-05-08",
    published: false,
    readingMinutes: 2,
  },
  {
    slug: "vendor-review-notion-migration",
    title: "[Kladde] Vendor review — Notion → ny KB",
    summary: "Beslutningsgrundlag — intern brug.",
    bodyMd: `## Optioner

A) Behold Notion
B) Agency OS wiki (denne)
C) Hybrid

## Beslutning

Uafsluttet — vent på security sign-off.`,
    categoryId: "tooling",
    tags: ["vendor", "kb", "draft"],
    audience: "internal",
    authorId: "as",
    updatedAt: "2026-05-05",
    published: false,
    readingMinutes: 3,
  },
];
