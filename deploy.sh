#!/bin/bash

# Ensure the sudo password file has correct permissions
chmod 600 ~/.sudo_pass  # Ensure the file is only readable by the owner

# Read the sudo password from the file
sudo_pass=$(<~/.sudo_pass)

# Check if the build directory exists
if [ -d "dist" ]; then
  echo "Build directory exists."
else
  echo "Build directory does not exist." >&2
  exit 1
fi

# Remove the existing build directory if it exists
if [ -d "/var/www/html/medquest-admin-build" ]; then
  echo "Removing old build directory..."
  echo "$sudo_pass" | sudo -S rm -rf /var/www/html/medquest-admin-build || { echo "Failed to remove old build"; exit 1; }
  echo "Old build directory removed."
else
  echo "No existing build directory to remove."
fi

# Copy the new build directory to the deployment location
echo "Copying new build directory..."
echo "$sudo_pass" | sudo -S cp -r dist /var/www/html/medquest-admin-build || { echo "Failed to copy new build"; exit 1; }
echo "New build directory copied to /var/www/html/medquest-admin-build."

# Restart Nginx to apply changes
echo "Restarting Nginx service..."
echo "$sudo_pass" | sudo -S systemctl restart nginx || { echo "Failed to restart Nginx"; exit 1; }

# Deployment completed message
echo "Deployment completed successfully."
