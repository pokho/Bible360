#!/bin/bash

# Bible360 Development Server Starter
# This script starts the SvelteKit development server on port 7777

echo "Starting Bible360 Development Server..."
echo "====================================="
echo "Server will be available at: http://localhost:7777/"
echo "Press Ctrl+C to stop the server"
echo ""

# Navigate to the project directory (in case script is run from elsewhere)
cd "$(dirname "$0")"

# Start the development server
npm run dev -- --port 7777