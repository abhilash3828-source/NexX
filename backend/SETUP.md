# 🚀 NEXX Esports - Database Setup Guide

## Problem Fixed ✓
Your registrations were disappearing because **Render.com's free tier has an ephemeral filesystem** — it clears local files. This solution uses **MongoDB Atlas** (free tier) to store data persistently in the cloud.

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with email (free forever)
3. Create a new project named "nexx-esports"
4. Create a cluster:
   - Choose **M0 FREE** tier
   - Pick any region (closest to you is best)
   - Click "Create Deployment"
5. Wait 1-3 minutes for cluster to deploy

## Step 2: Get Connection String

1. In MongoDB Atlas, go to **Deployments** → Click your cluster
2. Click "Connect" button
3. Choose "Drivers" (not MongoDB Compass)
4. Select "Node.js" and version 5.x
5. Copy the connection string that looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with your credentials

## Step 3: Update Environment Variables

### Local Development (.env)
Create a `.env` file in the `backend/` folder:

```
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/nexx-esports?retryWrites=true&w=majority
PORT=4000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development

# Email settings (keep existing)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google Sheets (if using)
# GOOGLE_SHEET_ID=...
# GOOGLE_SERVICE_ACCOUNT_KEY=...
```

### On Render Deployment
Add this environment variable in Render dashboard:
- Key: `MONGODB_URI`
- Value: (your MongoDB connection string)

## Step 4: Install Dependencies

In `backend/` folder, run:
```bash
npm install
```

## Step 5: Start Development Server

```bash
npm run dev
```

You should see:
```
✓ Connected to MongoDB
✓ NEXX Esports backend running on http://localhost:4000
```

## Step 6: Deploy to Render

1. Push your code to GitHub
2. In Render dashboard, click "New +" → "Web Service"
3. Connect your repository
4. Fill in:
   - **Name**: nexx-esports-backend
   - **Runtime**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `npm start`
   - **Working Directory**: `backend`
5. Add environment variable: `MONGODB_URI` (your MongoDB connection string from Step 2)
6. Click "Create Web Service"

## Verification

✓ Check if working:
1. Register for tournament on website
2. Approve in admin panel
3. Wait 15 minutes, refresh page
4. **Data should still be there!** (Previously it disappeared)

## Backup Existing Data

If you had registrations in the JSON file, contact MongoDB support or manually enter them into the new database.

## Troubleshooting

**"MONGODB_URI not set"**
- Check your `.env` file is in `backend/` folder
- Restart the dev server

**"Connection refused"**
- Check your MongoDB connection string is correct
- Make sure MongoDB Atlas cluster is running (green light in atlas.mongodb.com)
- Add your IP to MongoDB whitelist: Deployment → Security → Network Access → Add IP

**"Authentication failed"**
- Double-check username and password in connection string match your MongoDB Atlas credentials
- Make sure you URL-encoded special characters in password (e.g., `@` → `%40`)

**"Cannot find module 'mongoose'"**
- Run `npm install` in the `backend/` folder
- Delete `node_modules/` folder and run `npm install` again

---

**Questions?** Check the [Mongoose docs](https://mongoosejs.com) or MongoDB Atlas docs.
