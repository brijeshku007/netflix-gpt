const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying build output...');

const buildDir = path.join(__dirname, 'build');
const publicFiles = [
  'favicon.svg',
  'favicon-16x16.svg', 
  'apple-touch-icon.svg',
  'manifest.json',
  'streamme-logo.svg'
];

if (!fs.existsSync(buildDir)) {
  console.log('❌ Build directory does not exist');
  process.exit(1);
}

console.log('✅ Build directory exists');

publicFiles.forEach(file => {
  const filePath = path.join(buildDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists in build`);
  } else {
    console.log(`❌ ${file} missing from build`);
  }
});

// Check index.html for favicon references
const indexPath = path.join(buildDir, 'index.html');
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  if (indexContent.includes('favicon.svg')) {
    console.log('✅ index.html contains favicon references');
  } else {
    console.log('❌ index.html missing favicon references');
  }
} else {
  console.log('❌ index.html not found in build');
}

console.log('🎉 Build verification complete');