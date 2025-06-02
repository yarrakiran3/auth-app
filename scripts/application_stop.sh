#!/bin/bash
# Stop the application if it's running
pm2 delete auth-app || true # The '|| true' ensures the script doesn't fail if the app isn't running
