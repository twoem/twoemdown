# 🚀 TWOEM Online Productions - Render.com Deployment Guide

## Prerequisites

1. **MongoDB Atlas Account** (Free tier available)
2. **Render.com Account** (Free tier available)
3. **GitHub Repository** with your code

## Step-by-Step Deployment

### 1. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user
4. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/twoem_db`)
5. Whitelist all IP addresses (0.0.0.0/0) for Render deployment

### 2. Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit - TWOEM Online Productions"
git remote add origin https://github.com/yourusername/twoem-online-productions.git
git push -u origin main
```

### 3. Deploy on Render.com

#### Option A: Using render.yaml (Recommended)

1. Fork/clone this repository to your GitHub
2. Go to [Render.com](https://render.com) and sign up
3. Click "New" → "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect the `render.yaml` file
6. Set the following environment variables:
   
   **For Backend Service:**
   - `MONGO_URL`: Your MongoDB Atlas connection string
   - `DB_NAME`: `twoem_db`
   
   **For Frontend Service:**
   - `REACT_APP_BACKEND_URL`: Will be auto-set to your backend URL

7. Deploy!

#### Option B: Manual Setup

**Backend Deployment:**
1. New → Web Service
2. Connect GitHub repository
3. Settings:
   - **Environment**: Python
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && python -m uvicorn server:app --host 0.0.0.0 --port $PORT`
   - **Root Directory**: Leave empty
4. Environment Variables:
   - `MONGO_URL`: Your MongoDB connection string
   - `DB_NAME`: `twoem_db`

**Frontend Deployment:**
1. New → Static Site
2. Connect same GitHub repository
3. Settings:
   - **Build Command**: `cd frontend && yarn install && yarn build`
   - **Publish Directory**: `frontend/build`
4. Environment Variables:
   - `REACT_APP_BACKEND_URL`: Your backend service URL

### 4. Update URLs

After deployment:
1. Copy your backend service URL from Render
2. Update frontend environment variable `REACT_APP_BACKEND_URL`
3. Redeploy frontend

### 5. Test Your Deployment

1. Visit your frontend URL
2. Test admin login: `twoem` / `Twoemweb@2020`
3. Try uploading documents and eulogies
4. Verify all functionality works

## Alternative Platforms

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel

# Note: Backend needs separate hosting (Railway, Heroku, etc.)
```

### Netlify Deployment
1. Connect GitHub repo to Netlify
2. Build settings are in `netlify.toml`
3. Set environment variables in Netlify dashboard

### Docker Deployment
```bash
# Build and run with Docker
docker build -t twoem-app .
docker run -p 8000:8000 twoem-app
```

## Environment Variables Reference

### Backend (.env)
```env
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/twoem_db
DB_NAME=twoem_db
PORT=8000
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
```

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed**
   - Check connection string format
   - Verify network access (whitelist 0.0.0.0/0)
   - Ensure database user has correct permissions

2. **Frontend Can't Connect to Backend**
   - Verify `REACT_APP_BACKEND_URL` is correct
   - Check CORS settings in backend
   - Ensure backend is running and accessible

3. **Build Failures**
   - Check Node.js/Python versions
   - Verify all dependencies are listed
   - Check build logs for specific errors

4. **File Upload Issues**
   - Check file size limits (13MB for eulogies)
   - Verify file type restrictions
   - Test with smaller files first

### Support

- **Email**: twoemcyber@gmail.com
- **Phone**: +254707330204

---

🎉 **Congratulations!** Your TWOEM Online Productions platform is now live!