#!/bin/bash
# Stop any running application instances
if [ -d "/home/ec2-user/auth-app-deployment" ]; then
  cd /home/ec2-user/auth-app-deployment
  pm2 delete auth-app || true # Assuming you use PM2
fi

# Clean up previous deployment directory
rm -rf /home/ec2-user/auth-app-deployment
mkdir -p /home/ec2-user/auth-app-deployment
