# Swayambhoo International School — Phase 1 Website

A production-ready, accessible, biophilic educational institution website built for **Swayambhoo International School**, Wazirganj, Gaya, Bihar – 805131, India.

---

## 🏛️ Institutional Profile
- **Institution**: Swayambhoo International School
- **Established**: 2024
- **Location**: Wazirganj, Gaya, Bihar – 805131, India
- **Motto**: *LEARN • GROW • LEAD*
- **Campus Inscription**: *&ldquo;Discipline Today, Leadership Tomorrow&rdquo;*
- **Official Phone**: `+91 92412 18844`
- **Official WhatsApp**: `+91 96614 48541`
- **Email**: `admissions@swayambhooschool.com` | `info@swayambhooschool.com`

---

## 🎨 Design System & Visual Identity
Derived from neoclassical architectural rendering and official uniform specifications:
- **Primary**: Deep Forest Green (`#14342B` / `#0E241B`)
- **Canvas / Secondary**: Warm Ivory (`#FDFBF7`) & Warm Beige (`#F5EFEB`)
- **Accent**: Muted Architectural Gold (`#C5A059` / `#856627`)
- **Uniform Chocolate Brown**: (`#4A2E1B`)
- **Soft Sage**: (`#8FA38F`)
- **Typography**: Editorial Classical Headings (Cinzel / Playfair Display) paired with high-legibility sans-serif body (Inter)
- **Aesthetic Principles**: Neoclassical symmetry, biophilic warmth, natural wood, minimal geometric borders, no gratuitous SaaS rounded bubbles.

---

## 📂 Exact Project Structure
```text
swayambhoo-international-school/
├── app/
│   ├── layout.tsx                # Root layout with fonts, StructuredData, Navbar, Footer
│   ├── page.tsx                  # Full-featured 14-section homepage
│   ├── globals.css               # Design tokens, typography, architectural borders
│   ├── about/page.tsx            # School vision, mission, ethos, campus wings
│   ├── academics/page.tsx        # School stages (Nursery to Grade 10) & +2 streams
│   ├── campus/page.tsx           # Neoclassical architecture & biophilic quads
│   ├── facilities/page.tsx       # 6 core facilities with deep architectural detail
│   ├── student-life/page.tsx     # Official Uniform standards & 4 House systems
│   ├── admissions/page.tsx       # 4-step admission guide & interactive enquiry form
│   ├── gallery/page.tsx          # Filterable 9-asset gallery with image lightbox
│   ├── contact/page.tsx          # Geolocation directions, map, direct message form
│   ├── privacy/page.tsx          # Comprehensive student & parent privacy policy
│   ├── terms/page.tsx            # Institutional terms of use & legal framework
│   ├── not-found.tsx             # Custom 404 handler
│   ├── error.tsx                 # Error boundary
│   ├── sitemap.ts                # Automated XML sitemap generator
│   ├── robots.ts                 # Robots.txt configuration
│   └── api/
│       └── enquiries/
│           └── route.ts          # Zod validation + PostgreSQL / safe dev fallback
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky header with transparent-to-solid transition
│   │   ├── MobileNav.tsx         # Accessible mobile drawer with WhatsApp CTA
│   │   ├── Footer.tsx            # Institutional footer with transparency notice
│   │   └── FloatingWhatsApp.tsx  # Sticky bottom-right WhatsApp quick-chat desk
│   ├── home/
│   │   ├── Hero.tsx              # Cinematic hero with official campus visual
│   │   ├── SchoolIntroduction.tsx# Heritage, Sanskrit root & campus wings
│   │   ├── WhySwayambhoo.tsx     # 6 institutional pillars
│   │   ├── AcademicOverview.tsx  # K–12 stages overview
│   │   ├── SmartClassrooms.tsx   # Studio classrooms showcase
│   │   ├── STEMSection.tsx       # Robotics, coding & 3D prototyping
│   │   ├── CampusArchitecture.tsx# Neoclassical facade & shaded walks
│   │   ├── SportsSection.tsx     # Maple wood indoor arena
│   │   ├── LibrarySection.tsx    # Sensory reading pods & amphitheater
│   │   ├── StudentLifeSection.tsx# Boys & girls uniform standards
│   │   ├── SafetySection.tsx     # CCTV, GPS fleet & medical infirmary
│   │   ├── SustainabilitySection.tsx# Solar, rainwater & native flora
│   │   ├── AdmissionsCTA.tsx     # Dual WhatsApp & Form CTA
│   │   └── LocationSection.tsx   # Wazirganj NH-82 transit details
│   ├── academics/
│   │   ├── AcademicCard.tsx      # Individual stage card
│   │   ├── SchoolStage.tsx       # Stage grid wrapper
│   │   └── SeniorSecondary.tsx   # Science, Commerce, Humanities streams
│   ├── facilities/
│   │   ├── FacilityCard.tsx      # Facility overview card
│   │   ├── FacilityGrid.tsx      # Grid presentation
│   │   └── FacilityDetail.tsx    # Split media-copy detail section
│   ├── gallery/
│   │   ├── GalleryGrid.tsx       # Filterable grid
│   │   ├── GalleryFilter.tsx     # Category pill filters
│   │   └── ImageLightbox.tsx     # Keyboard-navigable HD modal lightbox
│   ├── admissions/
│   │   ├── AdmissionForm.tsx     # React Hook Form + Zod admission flow
│   │   └── AdmissionCTA.tsx      # Reusable admission CTA
│   ├── contact/
│   │   ├── ContactCard.tsx       # Address, phone, WhatsApp, hours
│   │   ├── ContactForm.tsx       # Direct message sender
│   │   └── MapPlaceholder.tsx    # Geolocation route helper
│   ├── ui/
│   │   ├── Button.tsx            # Architectural button variants (gold, primary, etc.)
│   │   ├── Container.tsx         # Responsive container
│   │   ├── SectionHeading.tsx    # Serif heading with gold accent divider
│   │   ├── Badge.tsx             # Categorical and status badges
│   │   ├── Card.tsx              # Architectural cards
│   │   └── AnimatedReveal.tsx    # Native IntersectionObserver scroll reveal
│   └── seo/
│       └── StructuredData.tsx    # Google Schema.org School JSON-LD
│
├── lib/
│   ├── constants.ts              # Classes, sessions, house systems, gallery tags
│   ├── utils.ts                  # Class merger and date helpers
│   ├── validations.ts            # Zod validation schemas for forms
│   ├── metadata.ts               # OpenGraph, Twitter and Canonical metadata
│   └── whatsapp.ts               # Centralized WhatsApp click-to-chat generator
│
├── config/
│   └── site.ts                   # Centralized school configuration & image map
│
├── types/
│   ├── school.ts                 # Stages & pillars types
│   ├── facility.ts               # Facility domain types
│   ├── gallery.ts                # Gallery item & lightbox types
│   └── enquiry.ts                # Admission CRM enquiry types
│
├── prisma/
│   └── schema.prisma             # PostgreSQL schema ready for Phase 1 & 2
│
├── scripts/
│   └── seed.ts                   # Safe demonstration seed script
│
├── public/
│   ├── images/
│   │   ├── campus/               # swayambhoo-main-campus.jpg, campus-courtyard.jpg
│   │   ├── hero/                 # swayambhoo-hero-facade.jpg
│   │   ├── classrooms/           # smart-classroom.jpg
│   │   ├── labs/                 # stem-robotics.jpg
│   │   ├── library/              # school-library.jpg
│   │   ├── sports/               # sports-complex.jpg
│   │   ├── dining/               # dining-hall.jpg
│   │   ├── safety/               # campus-security.jpg
│   │   ├── student-life/         # student-activities.jpg
│   │   └── uniforms/             # boys-uniform.jpg, girls-uniform.jpg
│   ├── logo/
│   │   ├── swayambhoo-logo.svg   # Full horizontal logo with serif typography
│   │   └── swayambhoo-emblem.svg # Golden sacred flame spiral emblem
│   └── icons/
│
├── .env.example                  # Environment configuration template
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Start production server
npm run start
```

---

## 🗄️ Database & PostgreSQL Setup
The application is pre-configured with Prisma ORM:
- When `DATABASE_URL` is set, `POST /api/enquiries` inserts directly into the `AdmissionEnquiry` table in PostgreSQL.
- When `DATABASE_URL` is absent (Phase 1 development), the API safely falls back to a formatted development handler with a unique reference ID and timestamp.

To run migrations and seed when PostgreSQL is available:
```bash
npx prisma db push
npx tsx scripts/seed.ts
```

---

## 📱 WhatsApp Centralization
All WhatsApp interactions route through `lib/whatsapp.ts` with phone number `+91 96614 48541` and contextual query strings for admissions, campus tours, or general queries.

---

## 🔒 Image Safety & Academic Accuracy
All architectural imagery features clear &ldquo;Architectural Visualization • Proposed Concept&rdquo; disclosures. The website makes no unverified claims regarding board affiliations, awards, or rankings.
