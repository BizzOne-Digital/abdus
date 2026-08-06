# Admin CMS + MongoDB setup for Vote Shinwary

## Stack
- Next.js 15 (App Router)
- MongoDB (local Compass / mongod)
- Local uploads in `public/uploads` (not Cloudinary)

## Setup
1. Start MongoDB locally (Compass connection: `mongodb://127.0.0.1:27017`)
2. Database name: `shinwary` (created automatically on seed)
3. Copy env values in `.env.local` if needed
4. Install + seed + run:

```bash
npm install
npm run seed
npm run dev
```

## URLs
- Website: http://localhost:3000
- Admin: http://localhost:3000/admin/login

Default admin:
- Email: `admin@shinwary.ca`
- Password: `admin123`

## Admin sidebar
- Dashboard
- Pages (home, about, vision, ward-1, community, gallery, testimonials, faqs, contact) — section-by-section + images
- Priorities / Services (add/edit/delete; card tab + detail-page tab)
- Gallery (categories + images)
- Testimonials
- FAQs
- Settings (email/phone/social/logo — updates footer + contact)

## Notes
- Uploaded files go to `public/uploads/`
- Change `ADMIN_PASSWORD` and `AUTH_SECRET` before production
