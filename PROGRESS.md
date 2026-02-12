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
- [x] Create JPA repositories
- [x] Create REST API endpoints
  - GET /api/cv (public - fetch all CV data)
  - PUT /api/admin/* (protected - edit CV)
- [x] Configure Google OAuth2 + JWT security
- [x] Update React frontend:
  - Add React Router
  - Create /console admin page
  - Add forms for editing CV
  - Connect to Spring Boot API
- [x] Create Dockerfile for backend
- [x] Make frontend responsive (mobile, tablet, web)

### Pending
- [ ] Set up Google Cloud OAuth credentials
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
│   ├── pages/              # CvPage, ConsolePage
│   ├── services/           # API service
│   ├── context/            # AuthContext
│   └── components/         # Reusable components
├── backend/                # Spring Boot
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/java/dev/salyem/cv/
│       ├── CvApplication.java
│       ├── entity/         # JPA entities
│       ├── repository/     # JPA repositories
│       ├── service/        # CvService, JwtService, UserService
│       ├── controller/     # CvController, AdminController, AuthController
│       ├── config/         # SecurityConfig, JWT filter, OAuth handler
│       └── dto/            # CvDto
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
3. **Set up Google OAuth:**
   - Go to https://console.cloud.google.com
   - Create OAuth 2.0 credentials
   - Set authorized redirect URI: `https://salyem.dev/api/auth/google/callback`
   - Add client-id and client-secret to environment variables
4. **Deploy backend:**
   - Build: `cd backend && docker build -t cv-backend .`
   - Run: `docker run -d -p 8081:8081 --name cv-backend --restart always -e DB_HOST=localhost -e GOOGLE_CLIENT_ID=xxx -e GOOGLE_CLIENT_SECRET=xxx cv-backend`
   - Update nginx to proxy /api to localhost:8081

---

Last updated: 2026-02-12
