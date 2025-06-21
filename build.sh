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

# Ensure we have the latest lockfile
if [ ! -f "yarn.lock" ]; then
    echo "📝 Generating yarn.lock file..."
    yarn install
fi

# Install dependencies and build
yarn install
yarn build
cd ..

echo "✅ Build completed successfully!"