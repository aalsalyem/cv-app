# CV App Project Progress

## Current Status: LIVE at https://salyem.dev

## Phase 2 Status: IN PROGRESS - Admin Console with Spring Boot

---

## Phase 1: Completed

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

## Phase 2: Admin Console (IN PROGRESS)

### Architecture
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React     │────▶│ Spring Boot │────▶│ PostgreSQL  │
│  Frontend   │     │   Backend   │     │  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
     :80                 :8081              :5432
                           │
                  ┌────────┴────────┐
                  │  Google OAuth2  │
                  └─────────────────┘
```

### Completed
- [x] Install PostgreSQL on Droplet
- [x] Create database and user (cvapp)
- [x] Create database schema (all tables)
- [x] Seed database with current CV data
- [x] Secure passwords and create vault.md
- [x] Create Spring Boot project structure
- [x] Create all JPA entities

### Pending
- [ ] Create JPA repositories
- [ ] Create REST API endpoints
  - GET /api/cv (public - fetch all CV data)
  - PUT /api/admin/* (protected - edit CV)
- [ ] Configure Google OAuth2 (need Google Cloud credentials)
- [ ] Create security config (JWT + OAuth)
- [ ] Update React frontend:
  - Add React Router
  - Create /console admin page
  - Add Headless UI forms
  - Connect to Spring Boot API
- [ ] Create Dockerfile for backend
- [ ] Deploy backend to server

---

## Database Schema

Tables created on PostgreSQL (droplet):
- `personal_info` - name, email, phone, location, linkedin, photo, objective
- `work_experience` - title, company, dates, responsibilities[], projects
- `education` - degree, field, school, dates
- `skills` - name, category
- `certificates` - name, issuer, date
- `languages` - name, proficiency
- `strengths` - name
- `users` - email, google_id, is_admin
- `theme_settings` - dark/light colors

All tables seeded with current CV data.

---

## Project Structure

```
cv-app/
├── src/                    # React frontend
├── backend/                # Spring Boot (NEW)
│   ├── pom.xml
│   └── src/main/java/dev/salyem/cv/
│       ├── CvApplication.java
│       ├── entity/         # JPA entities (DONE)
│       ├── repository/     # JPA repositories (TODO)
│       ├── service/        # Business logic (TODO)
│       ├── controller/     # REST endpoints (TODO)
│       ├── config/         # Security config (TODO)
│       └── dto/            # Data transfer objects (TODO)
├── vault.md               # Credentials (gitignored)
├── PROGRESS.md            # This file
└── Dockerfile             # Frontend Docker
```

---

## Server Access

```bash
# SSH to server
ssh root@209.38.252.236

# Redeploy frontend
cd /root/cv-app && git pull && docker build -t cv-app . && docker stop cv-app && docker rm cv-app && docker run -d -p 8080:80 --name cv-app --restart always cv-app

# PostgreSQL
sudo -u postgres psql -d cvapp

# Check running services
docker ps
systemctl status postgresql
```

---

## Credentials

See `vault.md` (gitignored) for:
- Database credentials
- Server access
- API tokens
- JWT secret

---

## Resume Instructions

When continuing this project:

1. **Read this file** to understand current state
2. **Read vault.md** for credentials
3. **Continue with pending tasks:**
   - Create repositories in `backend/src/main/java/dev/salyem/cv/repository/`
   - Create services in `backend/src/main/java/dev/salyem/cv/service/`
   - Create controllers in `backend/src/main/java/dev/salyem/cv/controller/`
   - Configure security in `backend/src/main/java/dev/salyem/cv/config/`
4. **Set up Google OAuth:**
   - Go to https://console.cloud.google.com
   - Create OAuth credentials
   - Add to vault.md and application.yml
5. **Update React frontend:**
   - Install: `npm install react-router-dom @headlessui/react @heroicons/react axios`
   - Add routing and admin console
6. **Deploy:**
   - Create backend Dockerfile
   - Deploy backend to server on port 8081
   - Update nginx config to proxy /api to backend

---

Last updated: 2026-02-11
