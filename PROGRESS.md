# CV App Project Progress

## Current Status: LIVE at https://salyem.dev

---

## Completed Tasks

### 1. React CV App (DONE)
- Created React + TypeScript + Vite app
- Dark/light theme toggle with localStorage persistence
- Responsive design (mobile + desktop)
- Profile photo with side-by-side header layout

### 2. CV Content (DONE)
- Personal info: Abdulaziz Mohammed Alsalyem
- Work Experience:
  - General Manager of Product Integration @ SDAIA (03/2025 - Present)
  - Quality Assurance Manager @ SDAIA (07/2020 - 03/2025)
  - Software Engineer @ SDAIA (05/2018 - 07/2020)
  - Senior Software Engineer @ Elm Company (02/2013 - 04/2018)
- Education: BS Computer Science, King Saud University
- Skills, Certificates, Languages

### 3. Styling (DONE)
- Dark theme: Sky blue accent (#74b9ff), high contrast
- Light theme: Blue accent (#0984e3)
- Lighter font weights (300/400)
- Profile photo with white background fill

### 4. Deployment (DONE)
- GitHub repo: https://github.com/aalsalyem/cv-app
- DigitalOcean Droplet: 209.38.252.236 (Frankfurt, $6/mo)
- Docker + Nginx setup
- SSL via Let's Encrypt (auto-renews)
- Domain: salyem.dev configured via GoDaddy

---

## Next Phase: Admin Console

### Requirements
- `/` - Public CV page (current)
- `/console` - Admin panel to manage CV content
- PostgreSQL database (Supabase)
- Google OAuth authentication
- Headless UI components

### Pending Tasks

#### 1. Set up Supabase Project
- [ ] User creates Supabase account at https://supabase.com
- [ ] Create new project named `cv-app`
- [ ] Get Project URL and anon key
- [ ] Save database password

#### 2. Create Database Schema
```sql
-- Tables needed:
- personal_info (name, email, phone, location, linkedin, photo_url)
- work_experience (id, title, company, start_date, end_date, responsibilities[], projects)
- education (id, degree, school, start_date, end_date)
- skills (id, name, category)
- certificates (id, name, issuer, date)
- languages (id, name, proficiency)
- theme_settings (primary_color, accent_color, etc.)
```

#### 3. Configure Google OAuth
- [ ] Enable Google provider in Supabase Auth
- [ ] Set up Google Cloud OAuth credentials
- [ ] Configure allowed redirect URLs

#### 4. Install Dependencies
```bash
npm install @supabase/supabase-js @headlessui/react @heroicons/react react-router-dom
```

#### 5. Build Admin Console
- [ ] Create React Router setup
- [ ] Build protected /console route
- [ ] Create forms for each CV section
- [ ] Implement CRUD operations
- [ ] Add photo upload to Supabase Storage

#### 6. Update Public CV
- [ ] Fetch CV data from Supabase on load
- [ ] Cache data for performance
- [ ] Fallback to static data if DB unavailable

#### 7. Deploy Updates
- [ ] Push to GitHub
- [ ] Rebuild Docker on server
- [ ] Test admin panel

---

## Server Access

```bash
# SSH to server
ssh root@209.38.252.236

# Redeploy after changes
cd /root/cv-app && git pull && docker build -t cv-app . && docker stop cv-app && docker rm cv-app && docker run -d -p 8080:80 --name cv-app --restart always cv-app
```

---

## Credentials & Config

- **Domain**: salyem.dev (GoDaddy)
- **Server IP**: 209.38.252.236
- **GitHub**: https://github.com/aalsalyem/cv-app
- **DigitalOcean API Token**: (stored in doctl)
- **Supabase**: PENDING - user needs to create account

---

## Resume Instructions

When continuing this project:
1. User provides Supabase Project URL and anon key
2. Run: `npm install @supabase/supabase-js @headlessui/react @heroicons/react react-router-dom`
3. Create `.env` with Supabase credentials
4. Create database schema in Supabase
5. Build admin console components
6. Update App.tsx with React Router
7. Deploy to server

---

Last updated: 2026-02-11
