#!/bin/bash
cd /home/ec2-user/auth-app-deployment

# Install Node.js if not present (adjust version as needed)
# Example for NVM
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# . ~/.nvm/nvm.sh
# nvm install 20 # or your desired Node.js version
# nvm use 20

# If you prefer to install node via yum/dnf
# sudo yum install -y nodejs npm

npm install
npm run build
