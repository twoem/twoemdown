#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting TWOEM Backend..."

# Navigate to backend directory
cd backend

# Start the FastAPI server
exec python -m uvicorn server:app --host 0.0.0.0 --port ${PORT:-8000}