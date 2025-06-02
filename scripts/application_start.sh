#!/bin/bash
cd /home/ec2-user/auth-app-deployment

# Install PM2 globally if not already installed
npm install -g pm2

# Start the Next.js app with PM2
# Ensure your package.json has a "start" script, e.g., "next start"
pm2 start npm --name "auth-app" -- start
pm2 save
