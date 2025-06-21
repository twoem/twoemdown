#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting TWOEM Production Server..."

# Start nginx in background
nginx &

# Navigate to backend directory
cd /app/backend

# Start the FastAPI server
exec python -m uvicorn server:app --host 0.0.0.0 --port ${PORT:-8000}