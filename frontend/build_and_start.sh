#!/bin/bash

# Build the Next.js app
npm run build

# Check if the app is running with PM2
pm2_status=$(pm2 list | grep phonesbulk | wc -l)

if [ $pm2_status -eq 1 ]; then
  # Restart the app in cluster mode
  pm2 restart phonesbulk
else
  # Start the app with PM2 in cluster mode
  pm2 start npm --name "phonesbulk" -- start -- -p 3000
fi
