# AI Sales Page Generator

<div align="center">

![AI Sales Page Generator](docs/screenshots/hero.png)

**Transform your product information into a complete, persuasive sales page — powered by AI.**

[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

[Live Demo](https://sales-ai-page-generator.vercel.app) · [Backend API](https://green-emu-428835.hostingersite.com/backend/public/api)

</div>

---

## Daftar Isi

- [Tentang Project](#tentang-project)
- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Arsitektur](#arsitektur)
- [Screenshots](#screenshots)
- [Flow Aplikasi](#flow-aplikasi)
- [Struktur Project](#struktur-project)
- [API Documentation](#api-documentation)
- [Instalasi Lokal](#instalasi-lokal)
- [Deployment](#deployment)

---

## Tentang Project

AI Sales Page Generator adalah web application yang memungkinkan pengguna membuat halaman penjualan (sales page) yang lengkap dan persuasif hanya dengan mengisi informasi dasar tentang produk atau layanan mereka.

Aplikasi ini dibangun dengan arsitektur **decoupled** — frontend React di-deploy ke Vercel, backend Laravel API di-deploy ke Hostinger, dan database MySQL di-host secara online. Keduanya berkomunikasi melalui REST API dengan autentikasi berbasis token menggunakan Laravel Sanctum.

---

## Fitur

### Core Features

#### 🔐 User Authentication
- Register, login, dan logout menggunakan Laravel Sanctum
- Token-based authentication — token disimpan di `localStorage` dan dikirim via `Authorization: Bearer` header
- Protected routes di frontend menggunakan React Router
- Data setiap user terisolasi — tidak bisa mengakses data user lain

![Login Page](docs/screenshots/login.png)

#### 📝 Product Input Form
Form terstruktur untuk mengisi informasi produk:
- Nama produk / layanan
- Deskripsi produk
- Fitur-fitur utama (comma-separated)
- Target audience
- Harga
- Unique Selling Point (opsional)
- Pilihan tone: Professional, Casual, Persuasive, Energetic, Luxury

![Generator Form](docs/screenshots/generator.png)

#### 🤖 AI Sales Page Generation
- Input dikirim ke backend Laravel API
- Backend generate sales page terstruktur dalam format JSON
- Output mencakup: headline, sub-headline, deskripsi, benefits, features, social proof, pricing, dan CTA
- Loading state saat proses generate
- Error handling jika terjadi kegagalan

#### 📚 Generation History
- Semua sales page tersimpan ke database MySQL
- Halaman history menampilkan semua hasil generate user
- Fitur search berdasarkan nama produk
- Delete sales page yang tidak dibutuhkan
- Data persistent — tersimpan meski browser ditutup

![History Page](docs/screenshots/history.png)

#### 👁️ Live Preview
- Sales page di-render sebagai halaman landing page nyata
- Tampilan presentable, bukan raw text
- Bisa langsung preview hasil sebelum export

---

### Bonus Features

#### 🎨 Multiple Design Templates
3 template visual yang berbeda, bisa diganti kapan saja tanpa regenerate:

| Template | Deskripsi |
|---|---|
| **Modern** | Gradient indigo/purple, card-based, clean & professional |
| **Bold** | Dark background zinc-900, aksen orange, typography uppercase, high-impact |
| **Minimal** | Pure white, font-light, border grid, elegant & timeless |

![Template Comparison](docs/screenshots/templates.png)

#### ♻️ Section-by-Section Regeneration
- Regenerate hanya bagian tertentu tanpa mengubah keseluruhan sales page
- Section yang bisa di-regenerate: Headline, Sub-headline, Description, Benefits, Features, CTA
- Dua cara: klik tombol di quick bar atas, atau hover langsung di section preview
- Loading per-section — bagian lain tetap normal

![Section Regeneration](docs/screenshots/section-regen.png)

#### 📤 Export Options
- **Export .txt** — semua copy dalam format teks rapi
- **Export .html** — standalone HTML file dengan inline CSS, siap langsung dipakai sebagai landing page tanpa dependency apapun

---

## Tech Stack

### Backend
| Teknologi | Versi | Kegunaan |
|---|---|---|
| PHP | 8.5 | Runtime |
| Laravel | 11 | REST API Framework |
| Laravel Sanctum | 4.x | Token-based Authentication |
| MySQL | 8 | Database |

### Frontend
| Teknologi | Versi | Kegunaan |
|---|---|---|
| React | 18 | UI Library |
| Vite | 6 | Build Tool |
| React Router | 6 | Client-side Routing |
| Axios | 1.x | HTTP Client |
| Tailwind CSS | 4 | Styling |

### Deployment
| Platform | Kegunaan |
|---|---|
| Vercel | Hosting frontend React |
| Hostinger | Hosting backend Laravel API |
| Niagahoster MySQL | Database online |

---

## Arsitektur

```
┌─────────────────────────────────┐
│         Browser / User          │
└────────────────┬────────────────┘
                 │
     ┌───────────▼───────────┐
     │    React App          │
     │    (Vercel)           │
     │                       │
     │  /login               │
     │  /register            │
     │  /dashboard           │
     │  /history             │
     │  /preview/:id         │
     └───────────┬───────────┘
                 │ HTTPS + Bearer Token
                 │ (Axios)
     ┌───────────▼───────────┐
     │    Laravel API        │
     │    (Hostinger)        │
     │                       │
     │  POST /auth/register  │
     │  POST /auth/login     │
     │  GET  /sales-pages    │
     │  POST /sales-pages    │
     │  GET  /sales-pages/id │
     │  DELETE /sales-pages/id│
     │  POST /.../regenerate │
     │  POST /.../regen-sect │
     └───────────┬───────────┘
                 │
     ┌───────────▼───────────┐
     │    MySQL Database     │
     │    (Niagahoster)      │
     │                       │
     │  users                │
     │  personal_access_tokens│
     │  sales_pages          │
     └───────────────────────┘
```

---

## Screenshots

### Login & Register
![Login](docs/screenshots/login.png)

### Generator Form
![Generator](docs/screenshots/generator.png)

### Template Selection
![Templates](docs/screenshots/templates.png)

### Live Preview — Modern Template
![Preview Modern](docs/screenshots/preview-modern.png)

### Live Preview — Bold Template
![Preview Bold](docs/screenshots/preview-bold.png)

### Live Preview — Minimal Template
![Preview Minimal](docs/screenshots/preview-minimal.png)

### Section Regeneration
![Section Regen](docs/screenshots/section-regen.png)

### History Page
![History](docs/screenshots/history.png)

### Export HTML Result
![Export](docs/screenshots/export.png)

---

## Flow Aplikasi

### 1. Authentication Flow
```
User buka app
      │
      ▼
Belum login? ──────► Redirect ke /login
      │
      ▼
Isi email & password
      │
      ▼
POST /api/auth/login
      │
      ▼
Laravel cek credentials di DB
Hash.check(password, hash)
      │
      ├── Gagal ──► Return 422 + pesan error
      │
      └── Berhasil ──► Generate Sanctum Token
                            │
                            ▼
                   Return { user, token }
                            │
                            ▼
               React simpan token di localStorage
                            │
                            ▼
                  Redirect ke /dashboard
```

### 2. Generate Sales Page Flow
```
User isi form produk
      │
      ▼
Pilih design template
      │
      ▼
Klik "Generate Sales Page"
      │
      ▼
POST /api/sales-pages
Header: Authorization: Bearer {token}
Body: { product_name, description, features, ... }
      │
      ▼
Laravel validate input
      │
      ▼
Generate structured JSON content
{ headline, sub_headline, description,
  benefits[], features[], social_proof[],
  pricing{}, cta{} }
      │
      ▼
Simpan ke DB (sales_pages table)
      │
      ▼
Return { data: { id, content, ... } }
      │
      ▼
React redirect ke /preview/:id
      │
      ▼
Render template sesuai pilihan user
```

### 3. Section Regeneration Flow
```
User hover section di preview
      │
      ▼
Klik tombol "↺ Regenerate"
      │
      ▼
POST /api/sales-pages/{id}/regenerate-section
Body: { section: "headline" }
      │
      ▼
Laravel ambil record dari DB
Generate konten baru untuk section tsb
Update JSON content di DB
      │
      ▼
Return { section, content: "new content" }
      │
      ▼
React update state lokal
Hanya section itu yang re-render
```

---

## Struktur Project

```
sales-ai-page-generator/
│
├── backend/                          # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── Api/
│   │   │           ├── AuthController.php        # Register, login, logout
│   │   │           └── SalesPageController.php   # CRUD + regenerate
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   └── SalesPage.php
│   │   └── Services/
│   ├── database/
│   │   └── migrations/
│   │       └── create_sales_pages_table.php
│   ├── routes/
│   │   └── api.php                   # Semua API routes
│   └── config/
│       └── cors.php                  # CORS configuration
│
├── frontend/                         # React App
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx         # Generator form
│   │   │   ├── History.jsx
│   │   │   └── Preview.jsx           # Sales page preview
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── templates/
│   │   │       ├── ModernTemplate.jsx
│   │   │       ├── BoldTemplate.jsx
│   │   │       ├── MinimalTemplate.jsx
│   │   │       └── SectionWrapper.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Global auth state
│   │   ├── services/
│   │   │   └── api.js                # Axios instance + interceptors
│   │   └── utils/
│   │       └── exportHtml.js         # HTML export generator
│   └── .env                          # VITE_API_URL
│
├── .cpanel.yml                       # Hostinger deploy hook
├── .gitignore
└── README.md
```

---

## Database Schema

### Tabel `users`
| Column | Type | Keterangan |
|---|---|---|
| id | bigint | Primary key |
| name | varchar | Nama user |
| email | varchar | Email (unique) |
| password | varchar | Bcrypt hash |
| created_at | timestamp | |

### Tabel `sales_pages`
| Column | Type | Keterangan |
|---|---|---|
| id | bigint | Primary key |
| user_id | bigint | Foreign key ke users |
| product_name | varchar | Nama produk |
| input_data | json | Input form user |
| content | json | Generated sales page content |
| status | varchar | completed |
| created_at | timestamp | |

### Struktur JSON `content`
```json
{
  "headline": "string",
  "sub_headline": "string",
  "description": "string",
  "benefits": ["string", "..."],
  "features": [
    { "title": "string", "description": "string" }
  ],
  "social_proof": [
    { "name": "string", "role": "string", "quote": "string" }
  ],
  "pricing": {
    "price": "string",
    "billing": "string",
    "guarantee": "string",
    "includes": ["string"]
  },
  "cta": {
    "primary": "string",
    "secondary": "string"
  }
}
```

---

## API Documentation

Base URL: `https://green-emu-428835.hostingersite.com/backend/public/api`

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

Response:
```json
{
  "message": "Registration successful",
  "user": { "id": 1, "name": "John Doe", "email": "john@example.com" },
  "token": "1|abc123..."
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer {token}
```

---

### Sales Pages

> Semua endpoint di bawah membutuhkan `Authorization: Bearer {token}`

#### Get All (History)
```http
GET /sales-pages
GET /sales-pages?search=produk
```

#### Generate New
```http
POST /sales-pages
Content-Type: application/json

{
  "product_name": "ProTask Manager",
  "description": "Project management tool",
  "features": "Kanban, Analytics, Collaboration",
  "target_audience": "Remote teams",
  "price": "$29/month",
  "usp": "Built-in time tracking",
  "tone": "Professional"
}
```

#### Get Detail
```http
GET /sales-pages/{id}
```

#### Delete
```http
DELETE /sales-pages/{id}
```

#### Regenerate All
```http
POST /sales-pages/{id}/regenerate
```

#### Regenerate Section
```http
POST /sales-pages/{id}/regenerate-section
Content-Type: application/json

{
  "section": "headline"
}
```

Nilai `section` yang valid: `headline`, `sub_headline`, `description`, `benefits`, `features`, `cta`

---

## Instalasi Lokal

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 20+
- MySQL

### Backend

```bash
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Edit .env sesuai konfigurasi lokal
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_DATABASE=sales_db

# Generate app key
php artisan key:generate

# Jalankan migration
php artisan migrate

# Start server
php artisan serve
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Buat file .env
echo "VITE_API_URL=http://127.0.0.1:8000/api" > .env

# Start dev server
npm run dev
```

Buka `http://localhost:5173`

---

## Deployment

### Backend — Hostinger

1. Push ke GitHub
2. Di hPanel Hostinger → **GIT** → hubungkan repo
3. Klik **Deploy**
4. Upload `.env` via File Manager ke `public_html/backend/`
5. Via SSH: `cd public_html/backend && composer install --no-dev`
6. `php artisan migrate --force`

### Frontend — Vercel

1. Login ke [vercel.com](https://vercel.com)
2. **New Project** → import repo GitHub
3. Set **Root Directory**: `frontend`
4. Tambah **Environment Variable**:
   - `VITE_API_URL` = URL backend Hostinger
5. Klik **Deploy**

---

## Author

**Angga Wika Nugraha**

[![GitHub](https://img.shields.io/badge/GitHub-AnggaWikaNugraha-181717?style=for-the-badge&logo=github)](https://github.com/AnggaWikaNugraha)

---

<div align="center">

Dibuat sebagai submission task untuk technical assessment.

</div>
