# Outspan Hotel Nyeri - Website

This workspace contains a complete modern hotel website with React frontend and Laravel API backend.

## 📁 Structure

- **frontend/** - React.js single-page application
- **backend/** - (not yet created) planned Laravel REST API
- **uploads/** - Media storage for admin uploads

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ & npm
- PHP 8.1+, Composer
- MySQL 8.0+ (or Docker)

### Start Frontend

```bash
cd frontend
npm install
npm start
```

Opens [http://localhost:3000](http://localhost:3000)

### Start Backend

The backend folder and Laravel API have not yet been added to this repository. The current workspace contains the React frontend only.

If you add a Laravel backend in the future, use the following startup commands from the `backend/` directory:

#### Option A: Using Docker (Recommended)

```bash
cd backend
docker-compose up -d
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed --class=RoomSeeder
php artisan serve
```

API at [http://localhost:8000](http://localhost:8000)

#### Option B: Local MySQL

1. Create MySQL database: `outspan_hotel`
2. Update `.env` DB credentials
3. Run: `composer install && php artisan migrate --seed && php artisan serve`

## 📖 Features Implemented

### Frontend (React)

- ✓ Hero section with CTAs
- ✓ Rooms showcase with pricing
- ✓ Booking form (wired to API)
- ✓ Contact form (wired to API)
- ✓ Live chat assistant (wired to API)
- ✓ Responsive design
- ✓ API integration with error handling

### Backend (Laravel)

- ⚠️ No backend code is included in this workspace yet.
- ✅ Placeholder API calls are implemented in the frontend services.
- ✅ The app is wired to call `http://localhost:8000/api/*` if a backend is added later.

## 🔌 API Endpoints (Planned)

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/rooms` | List all rooms |
| POST | `/api/reservations/check-availability` | Check room availability |
| POST | `/api/reservations` | Create reservation |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/chat` | Send chat message |
| POST | `/api/reviews` | Submit review |
| GET | `/api/reviews` | Get approved reviews |

## 🔧 Development Workflow

- Frontend calls API at [http://localhost:8000/api](http://localhost:8000/api)
- Backend processes requests and returns JSON
- Frontend updates UI with response

Example booking flow:

```text
User fills form → POST /api/reservations → Backend validates & saves → Returns confirmation code → Frontend displays confirmation
```

## 📝 Next Steps to Enhance

1. **Authentication**: Add Laravel Sanctum for admin login
2. **Email**: Configure SMTP for reservation confirmations
3. **Media Upload**: Implement room/menu image uploads
4. **Payment**: Integrate Stripe/PayPal
5. **Admin Dashboard**: Create admin UI for staff
6. **Tests**: Add PHPUnit and Jest tests
7. **Deployment**: Configure for production (Heroku, DigitalOcean, AWS)
8. **SEO**: Add meta tags, sitemap, structured data

## 📚 Documentation

- Frontend setup: [frontend/package.json](frontend/package.json)
- Backend setup: [backend/README.md](backend/README.md)
- API routes: [backend/routes/api.php](backend/routes/api.php)
- React components: [frontend/src/components/](frontend/src/components/)
- API service: [frontend/src/services/apiService.js](frontend/src/services/apiService.js)

## 🎨 Customization

- **Colors/Fonts**: Edit [frontend/src/index.css](frontend/src/index.css)
- **API URL**: Update in [frontend/src/services/apiService.js](frontend/src/services/apiService.js) (line 3)
- **Database**: Migrations in [backend/database/migrations/](backend/database/migrations/)
- **API Logic**: Controllers in [backend/app/Http/Controllers/](backend/app/Http/Controllers/)

## 🐛 Troubleshooting

**Frontend can't connect to API?**

- Ensure backend is running: `php artisan serve`
- Check API_BASE URL in apiService.js

**Database connection error?**

- Verify MySQL credentials in .env
- Run `php artisan migrate --fresh`

**CORS errors?**

- CORS already configured in backend/config/cors.php
- Verify frontend URL is in allowed_origins
