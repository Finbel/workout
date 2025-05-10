# Workout App — 8-Week Roadmap

**Timeframe:** May 11 → July 6 2025 (≈60 days)
**Time budget:** ≈ 1 hr / day → 7 hrs / week (56 hrs total)

---

## 1. Objectives

### Must-haves (MVP)

- Daily workout entry form (exercises, sets × reps × weight, notes)
- Two activity views: **Calendar** & **Timeline**
- Simple **Stats / PR** tracker (best lift per exercise, total volume)
- Mobile-first responsive UI (Material UI)

### Nice-to-haves (post-MVP)

- Mon-Fri workout **template scheduler**
- **Charts** (volume & 1 RM trends) using Recharts
- **PWA** install & offline cache (Vite PWA plugin)
- Future: switch persistence layer from `localStorage` → Supabase

### Success Metrics

| Date                 | Goal                                                           |
| -------------------- | -------------------------------------------------------------- |
| **Day 40 (June 19)** | Deployed MVP lives on public URL & remains bug-free for 7 days |
| **Day 60 (July 6)**  | ≥2 nice-to-haves completed & still bug-free                    |

---

## 2. Milestone Timeline

| #   | When          | Milestone                    | Deliverable                               |
| --- | ------------- | ---------------------------- | ----------------------------------------- |
| M0  | **May 11**    | Project Kick-off             | Repo, CI checks, Storybook scaffold       |
| M1  | May 24 (wk 2) | Core data & entry            | Zustand store + daily entry form works    |
| M2  | Jun 7 (wk 4)  | Activity views & basic stats | Calendar, timeline, stats card            |
| M3  | **Jun 19**    | **MVP Ready**                | Deployed, 1-week bug-free clock starts    |
| M4  | Jun 26 (wk 6) | Templates                    | Template CRUD & autofill                  |
| M5  | Jul 3 (wk 7)  | Chart suite                  | Volume, 1 RM trend charts                 |
| M6  | **Jul 6**     | Polished PWA                 | Install banner, offline cache, audit pass |

---

## 3. Weekly Sprint Plan & Checklists

### **Week 1 (May 11 → May 17) — Setup & Foundation**

- [ ] Scaffold Vite + React + TypeScript project and push to GitHub
- [ ] Configure ESLint, Prettier, and Husky with pre-commit hooks
- [ ] Install and configure Material UI with custom theme (colors & fonts)
- [ ] Install and configure Storybook, add MUI integration
- [ ] Create Storybook tokens (spacing, typography) and document usage
- [ ] Sketch wireframes (paper/Figma) for main screens: Entry, Calendar, Stats
- [ ] Set up basic project file structure (e.g., `components/`, `features/`, `store/`, `utils/`)
- [ ] Create utility wrapper for `localStorage` (get/set/clear helpers)
- [ ] Read Zustand tutorial and take notes for store implementation

### **Week 2 (May 18 → May 24) — Data Model & Entry Form**

- [ ] Define TypeScript interfaces: `Exercise`, `WorkoutSet`, `Workout`
- [ ] Set up Zustand store: `useWorkoutStore` with CRUD actions
- [ ] Build Entry Form UI with add/remove sets, dynamic input fields
- [ ] Add support for notes/comments on a workout
- [ ] Ensure responsive layout: full-width mobile view, two-column for desktop
- [ ] Write Storybook stories for each part of the Entry component
- [ ] Add test coverage for core state logic (Jest + RTL)

### **Week 3 (May 25 → May 31) — Calendar & Timeline Views**

- [ ] Implement monthly calendar using MUI X or headless calendar
- [ ] Display workout markers on dates with entries
- [ ] Create timeline view: vertical scrollable list grouped by date
- [ ] Add date navigation between views (URL query param or tabs)
- [ ] Connect both views to Zustand store
- [ ] Add empty-state view and message (e.g., "No workouts yet")
- [ ] Basic accessibility checks (tab flow, aria labels)

### **Week 4 (June 1 → June 7) — Stats / PR Tracker**

- [ ] Write logic to calculate best lift per exercise (e.g., highest weight)
- [ ] Add calculation for total volume by exercise and week
- [ ] Build stats card UI (MUI Cards with icons, primary metric + delta)
- [ ] Set up Recharts and integrate simple volume bar chart
- [ ] Ensure chart resizes well for mobile and desktop
- [ ] Add dark mode styles and responsive polish

### **Week 5 (June 8 → June 14) — MVP Hardening & Deployment**

- [ ] Manually test all views (form, calendar, stats) on phone and desktop
- [ ] Set up Lighthouse and check performance, accessibility, and SEO scores
- [ ] Configure Vite PWA plugin with manifest, icons, and service worker
- [ ] Set up deployment to Vercel or Netlify with preview builds on PRs
- [ ] Conduct bug bash and fix top priority issues
- [ ] Freeze feature scope for MVP

### **Week 6 (June 15 → June 21) — Workout Templates**

- [ ] Define data model for `Template` and `TemplateDay`
- [ ] Build UI to create/edit/delete templates with day mapping
- [ ] Add option to auto-fill daily entry form from a template
- [ ] Save selected template state to localStorage
- [ ] Document Template component in Storybook
- [ ] Write unit tests for template logic

### **Week 7 (June 22 → June 28) — Chart Suite & UX Polish**

- [ ] Create line chart showing 1 RM estimate over time per exercise
- [ ] Create stacked bar chart for weekly volume per body part or lift type
- [ ] Add in-app theme toggle (light/dark)
- [ ] Implement subtle UI enhancements: pull-to-refresh, success toasts
- [ ] Polish transitions, spacing, and micro-interactions

### **Week 8 (June 29 → July 6) — PWA + Future-Proofing**

- [ ] Review and optimize caching strategy (Cache First vs Network First)
- [ ] Add PWA install prompt with fallback message for unsupported browsers
- [ ] Validate PWA install experience (desktop and Android)
- [ ] Spike Supabase setup (auth, table schema draft, env config)
- [ ] Create feature flag to toggle Supabase usage on/off
- [ ] Conduct final QA on all platforms (mobile/desktop, Chrome/Safari/Firefox)
- [ ] Write full README: tech stack, setup instructions, deployment, future plans
- [ ] Celebrate! 🥳

---

## 4. Recurring Weekly Ritual

- **Monday:** pull next sprint tasks into GitHub Projects board
- **Friday (15 min):** demo current build on phone & desktop; jot retro notes → log in README

Good luck, and remember: _ship small, ship often_! 💪
