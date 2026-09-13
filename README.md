# Swayambhoo International School — Phase 2 Platform

A production-ready, accessible, biophilic educational institution website and Content Management Platform built for **Swayambhoo International School**, Wazirganj, Gaya, Bihar – 805131, India.

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

## 🎨 Visual Identity & Architecture
Derived from neoclassical architectural rendering and official uniform specifications:
- **Primary**: Deep Forest Green (`#14342B` / `#0E241B`)
- **Canvas / Secondary**: Warm Ivory (`#FDFBF7`) & Warm Beige (`#F5EFEB`)
- **Accent**: Muted Architectural Gold (`#C5A059` / `#856627`)
- **Uniform Chocolate Brown**: (`#4A2E1B`)
- **Soft Sage**: (`#8FA38F`)
- **Typography**: Editorial Classical Headings (Cinzel / Playfair Display) paired with high-legibility sans-serif body (Inter)
- **Aesthetic Principles**: Neoclassical symmetry, biophilic warmth, natural wood, minimal geometric borders.

---

## 🛡️ Phase 2 Administration & CMS Architecture

The platform includes an administration portal and Content Management System running at `/admin`:

### Protected Admin Routes:
- `/admin/login` — Classical login portal with brute-force rate-limiting and timing-safe password verification
- `/admin/dashboard` — Overview metrics (6 KPI cards) and live Admissions intake table
- `/admin/admissions` — Full CRM with status triage (NEW, CONTACTED, FOLLOW_UP, CONVERTED, CLOSED), notes editor, filters, and CSV export
- `/admin/messages` — Contact message inbox with read/replied status management
- `/admin/school-profile` — Centralized institution metadata CMS (name, tagline, contacts, address, branding images)
- `/admin/academics` — Academic stages and toggleable Senior Secondary (+2) streams (Science, Commerce, Humanities)
- `/admin/facilities` — Campus facilities manager with dynamic features lists and photo uploads
- `/admin/gallery` — Multi-category gallery manager with sort order adjustment and media uploader
- `/admin/announcements` — School news and circulars publisher (Draft, Published, Archived)
- `/admin/events` — Academic calendar and campus event scheduler
- `/admin/settings` — Global system parameters (admissions season status, notification ticker toggle)

---

## 🗄️ Database & Prisma Schema

PostgreSQL database backed by Prisma ORM 7 with `@prisma/adapter-pg`.

### Models:
1. `User` — Role-based admin accounts (`SUPER_ADMIN`, `ADMIN`, `EDITOR`) with `scrypt` salted password hashes
2. `SchoolProfile` — Singleton central school configuration
3. `AcademicStage` & `AcademicStream` — K–12 stages and configurable +2 streams
4. `Facility` — Campus facilities with category and feature lists
5. `GalleryCategory` & `GalleryImage` — Photographic media records with sort order
6. `Announcement` — Public circulars and news items
7. `Event` — School calendar events with dates and venues
8. `AdmissionEnquiry` — Prospective student CRM applications
9. `ContactMessage` — General public feedback and inquiries
10. `SiteSetting` — Key-value system parameters
11. `MediaAsset` — Tracked file storage records

---

## 🔐 Environment Variables

Create `.env` based on `.env.example`:

```env
# Application URL
NEXT_PUBLIC_SITE_URL="http://localhost:3005"

# Contact Details
NEXT_PUBLIC_WHATSAPP_NUMBER="91966148541"
NEXT_PUBLIC_SCHOOL_PHONE="+91 92412 18844"
NEXT_PUBLIC_SCHOOL_EMAIL="admissions@swayambhooschool.com"

# PostgreSQL Database (Prisma 7)
DATABASE_URL="postgresql://postgres:password@localhost:5432/swayambhoo_school?schema=public"

# Auth Session Secret
AUTH_SECRET="your-32-character-random-secret-key"

# Initial Super Admin Initialization (via seed)
ADMIN_INITIAL_NAME="Head Administrator"
ADMIN_INITIAL_EMAIL="admin@swayambhooschool.com"
ADMIN_INITIAL_PASSWORD="YourSecureAdminPassword123!"

# Media Storage Provider
STORAGE_PROVIDER="local"
STORAGE_LOCAL_DIR="public/uploads"
```

---

## 🚀 Commands & Deployment

```bash
# 1. Install dependencies
npm install

# 2. Push Prisma schema to PostgreSQL database
npm run db:push

# 3. Seed foundation demonstration content & super-admin user
npx tsx scripts/seed.ts

# 4. Run local development server
npm run dev

# 5. Typecheck & build for production
npx tsc --noEmit
npm run build

# 6. Start production server
npm run start
```

---

## 📸 Media Storage Abstraction

The storage layer (`lib/storage/index.ts`) abstracts file uploads:
- **Default (Local)**: Saves images to `public/uploads/<folder>/` with unique random hashes, validated for file size (max 5MB) and MIME types (JPEG, PNG, WebP, SVG).
- **Future-Ready Cloud Providers**: Pluggable driver structure ready for AWS S3, Cloudflare R2, or Vercel Blob by configuring `STORAGE_PROVIDER`.

---

## 🔒 Security Measures

- **Passwords**: Hashed with Node.js native `crypto.scrypt` with random 16-byte salts and timing-safe equality checks.
- **Sessions**: Tamper-proof HMAC-SHA256 signed tokens stored in `httpOnly`, `sameSite: lax`, `path: /` cookies.
- **Route Guards**: Next.js Edge-compatible middleware protecting all `/admin/*` pages and `/api/admin/*` endpoints.
- **Brute Force Protection**: Sliding-window IP rate limiter on `/api/auth/login`.
- **Validation**: Strict schema validation on all inputs and API submissions via Zod.
- **Security Headers**: Injected via middleware (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`).

---

## 📄 License & Attribution

© 2024–2026 Swayambhoo International School. All rights reserved.
