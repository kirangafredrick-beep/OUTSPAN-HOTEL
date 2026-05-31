# Outspan Hotel Nyeri - Complete Website with Admin Dashboard

A modern, responsive hotel website built with **React** (frontend) and **Laravel** (backend) featuring a full-featured reservation system, admin dashboard, payment processing, and automated email notifications.

## 🎯 Key Features

### 👥 Guest Features
- ✅ Hero section with CTAs
- ✅ Room showcase with pricing
- ✅ Reservation system with availability checking
- ✅ Stripe payment integration
- ✅ Contact form
- ✅ Live chat assistant
- ✅ Reviews and ratings
- ✅ Responsive design

### 🔐 Admin Features
- ✅ Secure JWT authentication (Laravel Sanctum)
- ✅ Manage reservations (view, edit status, delete)
- ✅ Manage rooms (create, read, update, delete)
- ✅ Manage customer inquiries
- ✅ Dashboard with tabs for all features
- ✅ Protected API routes

### ⚙️ Backend Features
- ✅ REST API with validation
- ✅ JWT token-based authentication
- ✅ Stripe payment processing
- ✅ Email notifications (SMTP)
- ✅ Database migrations and seeders
- ✅ CORS configured for frontend
- ✅ AI-powered chatbot responses

---

## 📁 Project Structure

```
Outspan Hotel Nyeri/
├── frontend/              # React app
│   ├── public/
│   ├── src/
│   │   ├── components/    # UI components (Hero, Rooms, BookingForm, etc)
│   │   ├── pages/         # Admin pages (AdminDashboard, AdminLogin, etc)
│   │   ├── services/      # API services (apiService, adminService, stripeService)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/               # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/  # API controllers
│   │   ├── Mail/              # Email templates
│   │   ├── Models/            # Database models
│   │   └── Middleware/        # CORS, Auth middleware
│   ├── database/
│   │   ├── migrations/        # Database schema
│   │   └── seeders/           # Sample data
│   ├── routes/
│   │   └── api.php           # API endpoints
│   ├── config/
│   │   └── cors.php          # CORS configuration
│   ├── .env.example          # Environment template
│   ├── composer.json         # PHP dependencies
│   ├── docker-compose.yml    # MySQL + phpMyAdmin
│   └── README.md
├── uploads/                   # Media storage
├── .gitignore
└── README.md (this file)
```

---

## 🚀 Quick Start

### 1️⃣ Start Backend

**Using Docker (Recommended):**
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

**Or Local MySQL:**
```bash
cd backend
composer install
php artisan migrate --seed
php artisan serve
```

✅ Backend runs at: **http://localhost:8000**

### 2️⃣ Start Frontend

```bash
cd frontend
npm install
npm start
```

✅ Frontend runs at: **http://localhost:3000**

---

## 🔐 Admin Dashboard

### Access Admin Panel
- Click **"Admin Panel"** link in footer (on public site)
- Or press **Ctrl+A** to toggle
- Or navigate to **http://localhost:3000** and click Admin Panel

### Create Admin Account
```bash
POST http://localhost:8000/api/register
{
  "name": "Admin",
  "email": "admin@outspan.ke",
  "password": "admin123"
}
```

### Admin Capabilities

**Reservations Tab**
- View all guest bookings
- Edit reservation status (pending, confirmed, paid, cancelled)
- Delete reservations

**Rooms Tab**
- View all rooms with pricing
- Add new room types
- Edit room details
- Delete rooms

**Contacts Tab**
- View customer inquiries
- Track contact date and message

---

## 💳 Payment Integration (Stripe)

### Setup Stripe
1. Get test keys from https://dashboard.stripe.com
2. Add to `backend/.env`:
   ```env
   STRIPE_PUBLIC_KEY=pk_test_your_key
   STRIPE_SECRET_KEY=sk_test_your_key
   ```

### Payment Flow
1. Guest selects room and dates
2. Clicks "Book Now"
3. Payment modal appears
4. Enters card details
5. Stripe processes payment
6. Confirmation email sent

**Test Card:** `4242 4242 4242 4242` (any future date, any CVC)

---

## 📧 Email Setup

### Configure SMTP (Gmail Example)
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@outspan.ke
MAIL_FROM_NAME="Outspan Hotel"
```

### Emails Sent
- Reservation confirmation after booking
- Custom contact responses (optional)

---

## 🔌 API Endpoints Summary

### Public (No Auth Required)
```
GET  /api/rooms                           # List rooms
POST /api/reservations                    # Create booking
POST /api/reservations/check-availability # Check availability
POST /api/contact                         # Contact form
POST /api/reviews                         # Submit review
POST /api/chat                            # Chat with bot
POST /api/payment/create-intent           # Create payment
POST /api/payment/confirm                 # Confirm payment
POST /api/login                           # Admin login
POST /api/register                        # Admin register
```

### Protected (Admin Only - Requires JWT Token)
```
GET  /api/reservations                    # List all reservations
PUT  /api/reservations/{id}               # Update reservation
DELETE /api/reservations/{id}             # Delete reservation
POST /api/rooms                           # Create room
PUT  /api/rooms/{id}                      # Update room
DELETE /api/rooms/{id}                    # Delete room
GET  /api/contact                         # List contacts
POST /api/logout                          # Admin logout
```

**See [backend/README.md](backend/README.md) for detailed API documentation**

---

## 🧪 Testing

### Test Reservation
```bash
curl -X POST http://localhost:8000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "guest_name": "John Doe",
    "guest_email": "john@example.com",
    "check_in": "2024-06-15",
    "check_out": "2024-06-17",
    "adults": 2,
    "children": 1,
    "room_type": "Deluxe Room"
  }'
```

### Test Admin Login
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@outspan.ke",
    "password": "admin123"
  }'
```

### Test Protected Route
```bash
curl -X GET http://localhost:8000/api/reservations \
  -H "Authorization: Bearer your_jwt_token"
```

---

## 🎨 Customization

### Change Colors/Fonts
Edit `frontend/src/index.css`:
```css
:root {
  --bg: #fff;
  --fg: #111;
  --accent: #8b5e3c;  /* Luxury brown */
}
```

### Change Hotel Info
- **Contact:** `frontend/src/components/Contact.js` (line 34-40)
- **Hero:** `frontend/src/components/Hero.js` (line 8-9)
- **Rooms:** `backend/database/seeders/RoomSeeder.php`

### Add Images
Place images in:
```
frontend/public/assets/images/
├── about/
├── rooms/
├── restaurant/
├── activities/
├── gallery/
└── events/
```

---

## 📊 Database Schema

### Rooms
```sql
id, name, type, size, occupancy, price_per_night, description, amenities (JSON)
```

### Reservations
```sql
id, room_id, guest_name, guest_email, guest_phone, check_in, check_out,
adults, children, room_type, special_requests, status, confirmation_code
```

### Admins
```sql
id, name, email, password (hashed), role
```

### Contacts
```sql
id, name, email, phone, subject, message, status
```

### Reviews
```sql
id, guest_name, email, rating, comment, status
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Frontend can't connect to API | Ensure backend runs at http://localhost:8000 |
| Database connection error | Check MySQL is running, verify `.env` credentials |
| CORS errors | Ensure `config/cors.php` includes http://localhost:3000 |
| Email not sending | Test SMTP credentials via mailtrap.io |
| Admin login fails | Verify token in localStorage isn't expired |
| Stripe payment error | Check API keys in `.env`, use test mode keys |
| Sanctum token issues | Run `php artisan migrate`, restart Laravel |

---

## 🚢 Production Deployment

### Set Environment Variables
```env
APP_ENV=production
APP_DEBUG=false
STRIPE_SECRET_KEY=sk_live_xxx  (from Stripe)
MAIL_FROM_ADDRESS=info@outspan.ke
```

### Optimize Laravel
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
```

### Build React
```bash
cd frontend
npm run build
```

### Deploy Options
- **Heroku:** `git push heroku main`
- **DigitalOcean:** Use App Platform
- **AWS:** EC2 + RDS + S3
- **Netlify (Frontend)** + **Railway/Render (Backend)**

---

## 📚 Documentation

- [Backend Setup & API Docs](backend/README.md) - Detailed API reference
- [API Routes](backend/routes/api.php)
- [Database Migrations](backend/database/migrations/)
- [React Components](frontend/src/components/)
- [Admin Services](frontend/src/services/adminService.js)

---

## ✨ What's Included

### Frontend (React)
- Modern, responsive UI with CSS Grid/Flexbox
- Client-side form validation
- API integration with error handling
- Admin authentication flow
- Stripe payment modal
- Live chat assistant

### Backend (Laravel)
- RESTful API with proper HTTP methods
- JWT authentication via Sanctum
- Database validation and relationships
- Email notifications (Mailable classes)
- Payment processing (Stripe controller)
- Comprehensive error handling
- CORS middleware

### Database
- 5 migrations (rooms, reservations, admins, contacts, reviews)
- Sample data seeder with 5 room types
- Proper timestamps and relationships

---

## 🤝 Support

### Common Questions

**Q: How do I add more rooms?**
A: Use admin dashboard → Rooms tab → Add New Room

**Q: Can I change payment provider?**
A: Yes, replace Stripe with PayPal in `backend/app/Http/Controllers/PaymentController.php`

**Q: How do I backup reservations?**
A: Export MySQL database: `mysqldump outspan_hotel > backup.sql`

**Q: Is the site mobile responsive?**
A: Yes, built with mobile-first CSS Grid and Flexbox

**Q: Can I add WhatsApp booking?**
A: Yes, add WhatsApp link to Hero component: `<a href="https://wa.me/254794151515">Book via WhatsApp</a>`

---

## 📞 Contact Info

- **Hotel Phone:** +254 794 151 515
- **Email:** info@outspan.ke
- **Location:** Nyeri, Kenya (near Mt. Kenya)

---

**Built with ❤️ for Outspan Hotel, Nyeri**
*Complete hotel management system - Frontend • Backend • Admin Dashboard • Payment Integration • Email Notifications*
