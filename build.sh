#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting TWOEM build process..."

# Build backend
echo "📦 Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Build frontend
echo "🎨 Building frontend..."
cd frontend
yarn install --frozen-lockfile
yarn build
cd ..

echo "✅ Build completed successfully!"