# NEXX Esports

This repository contains a **Next.js frontend** and a **Node.js + Express backend** for a professional esports tournament platform.

## Features

- Dark esports theme with neon highlights
- Tournament listing, details, registration
- Full registration workflow with UPI screenshot upload
- Real-time seat tracking and tournament full handling
- Admin dashboard for approval and CSV export
- Google Sheets integration for storing registrations
- Responsive UI with Framer Motion animations

---

## Getting started (Local)

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on `http://localhost:4000` by default.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000`.

---

## Environment variables

### Backend

Create `backend/.env`:

```
PORT=4000
CORS_ORIGIN=http://localhost:3000
GOOGLE_SHEET_ID=<your-sheet-id>
GOOGLE_SERVICE_ACCOUNT_KEY=<json-string>
```

### Frontend

Create `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_ADMIN_PASS=nexxadmin
```

> **Note:** For production, set a stronger admin password.

---

## Deployment

### Frontend (Vercel)
1. Create a Vercel account (https://vercel.com).
2. Import the repository and set the **root directory** to `frontend`.
3. Set the following environment variable:
   - `NEXT_PUBLIC_API_URL` → `https://<YOUR_RENDER_BACKEND_URL>`
4. Deploy.

### Backend (Render)
1. Create a Render account (https://render.com).
2. Create a new **Web Service**.
3. Connect the repository and set the **root directory** to `backend`.
4. Use the following commands:
   - **Build:** `npm install`
   - **Start:** `npm start`
5. Add environment variables:
   - `PORT=4000`
   - `CORS_ORIGIN=https://<YOUR_FRONTEND_URL>`
   - Optional: `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_KEY`

> NOTE: This repo includes `frontend/vercel.json` and `render.yaml` to help bootstrap deployment.

---

## UPI Payment Flow (Recommended)

1. Pay ₹20 to `nexxesports@upi` using any UPI app.
2. Upload the payment screenshot and enter the Transaction ID on the registration page.
3. Admin manually verifies and approves the registration.
