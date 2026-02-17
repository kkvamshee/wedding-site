// scripts/generate-asset-manifest.js
const fs = require('fs');
const path = require('path');

function getFiles(dir, extensions) {
  const files = fs.readdirSync(dir);
  
  return files
    .filter(file => extensions.some(ext => file.endsWith(ext)))
    .map(file => `/${path.relative('public', path.join(dir, file))}`);
}

const manifest = {
  images: getFiles('./public/images', ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'])
};

fs.writeFileSync(
  './public/asset-manifest.json', 
  JSON.stringify(manifest, null, 2)
);

console.log('Asset manifest generated!', manifest);