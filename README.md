# TWOEM Online Productions

Professional document management and digital eulogy services platform.

## 🌟 Features

- **Document Management**: Secure upload and management of public documents
- **Eulogy Services**: Beautiful digital presentation of memorial PDFs (max 13MB)
- **Admin Dashboard**: Complete management interface for administrators
- **Responsive Design**: Works perfectly on all devices
- **Secure Access**: Protected admin authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- Python 3.11+
- MongoDB database

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd twoem-online-productions
   ```

2. **Install dependencies**
   ```bash
   yarn install-all
   ```

3. **Set up environment variables**
   
   Create `frontend/.env`:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8001
   ```
   
   Create `backend/.env`:
   ```env
   MONGO_URL=mongodb://localhost:27017/twoem_db
   DB_NAME=twoem_db
   ```

4. **Start development servers**
   ```bash
   yarn dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8001

## 🔐 Admin Access

- **Username**: `twoem`
- **Password**: `Twoemweb@2020`

## 📱 Contact Information

- **Location**: Kagwe Town Opposite Total Petrol Station, Plaza Building, First Floor
- **Email**: twoemcyber@gmail.com
- **Phone/WhatsApp**: +254707330204

## 🛠️ Technology Stack

### Frontend
- React 19
- Tailwind CSS
- Radix UI Components
- React Router DOM
- Axios for API calls

### Backend
- FastAPI
- MongoDB with Motor (async)
- Python 3.11
- Pydantic for data validation

## 📦 Deployment

### Render.com Deployment

1. **Fork this repository**

2. **Connect to Render**
   - Connect your GitHub repository to Render
   - The `render.yaml` file will automatically configure the deployment

3. **Set Environment Variables**
   - Set your MongoDB connection string in the Render dashboard
   - Update the `REACT_APP_BACKEND_URL` to your backend service URL

4. **Deploy**
   - Render will automatically build and deploy both frontend and backend

### Manual Deployment

1. **Build the application**
   ```bash
   chmod +x build.sh
   ./build.sh
   ```

2. **Start production server**
   ```bash
   chmod +x start-production.sh
   ./start-production.sh
   ```

## 🗂️ Project Structure

```
twoem-online-productions/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Main application pages
│   │   ├── contexts/       # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   └── mock/           # Mock data for development
│   ├── public/             # Static assets
│   └── build/              # Production build output
├── backend/                 # FastAPI backend application
│   ├── server.py           # Main application server
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
├── render.yaml             # Render.com deployment config
├── Dockerfile             # Docker configuration
├── nginx.conf             # Nginx configuration
└── build.sh              # Build script
```

## 🔧 Development

### Adding New Features

1. **Frontend**: Add new components in `frontend/src/components/`
2. **Backend**: Add new API endpoints in `backend/server.py`
3. **Styling**: Use Tailwind CSS classes for consistent styling

### API Endpoints

- `GET /api/` - Health check
- `POST /api/status` - Create status check
- `GET /api/status` - Get status checks

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support and inquiries, contact us at:
- Email: twoemcyber@gmail.com
- Phone: +254707330204

---

Built with ❤️ by TWOEM Online Productions