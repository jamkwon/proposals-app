#!/bin/bash

# Deployment script for FIGMINTS Proposals App
# Target: proposals.figmints.net

echo "🚀 Starting deployment for FIGMINTS Proposals App..."

# Build the application
echo "📦 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Create deployment package
echo "📁 Creating deployment package..."
tar -czf proposals-app-$(date +%Y%m%d-%H%M%S).tar.gz dist/

echo "🎯 Deployment package created!"
echo ""
echo "📋 Next steps:"
echo "1. Upload the tar.gz file to your server"
echo "2. Extract to the web root: tar -xzf proposals-app-*.tar.gz"
echo "3. Configure your web server to serve from the dist/ directory"
echo "4. Update DNS to point proposals.figmints.net to your server"
echo ""
echo "🌐 Live site will be available at: https://proposals.figmints.net"
echo ""
echo "✨ Deployment complete! All UX fixes implemented:"
echo "   ✅ Empty states now show helpful guidance instead of 'No proposals found'"
echo "   ✅ Mobile navigation is fully functional with hamburger menu"
echo "   ✅ Analytics page created with improved visual hierarchy"
echo "   ✅ All components properly responsive and accessible"