/**
 * Build script for Pith framework
 * Minifies and bundles CSS and JS files
 * 
 * This script uses esbuild for fast, efficient bundling
 * and minification without any complex configuration.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('Building Pith framework...\n');

/**
 * Build JavaScript
 * Minifies and bundles the JS file
 */
function buildJS() {
  console.log('Building JavaScript...');
  
  try {
    // Use esbuild to minify JavaScript
    execSync(
      `npx esbuild src/pith.js --bundle --minify --outfile=dist/pith.min.js`,
      { cwd: __dirname, stdio: 'inherit' }
    );
    
    // Also copy unminified version for development
    fs.copyFileSync(
      path.join(srcDir, 'pith.js'),
      path.join(distDir, 'pith.js')
    );
    
    console.log('✓ JavaScript built successfully\n');
  } catch (error) {
    console.error('✗ JavaScript build failed:', error.message);
    process.exit(1);
  }
}

/**
 * Build CSS
 * Minifies the CSS file
 */
function buildCSS() {
  console.log('Building CSS...');
  
  try {
    // Use esbuild to minify CSS
    execSync(
      `npx esbuild src/pith.css --bundle --minify --outfile=dist/pith.min.css`,
      { cwd: __dirname, stdio: 'inherit' }
    );
    
    // Also copy unminified version for development
    fs.copyFileSync(
      path.join(srcDir, 'pith.css'),
      path.join(distDir, 'pith.css')
    );
    
    console.log('✓ CSS built successfully\n');
  } catch (error) {
    console.error('✗ CSS build failed:', error.message);
    process.exit(1);
  }
}

/**
 * Calculate and display file sizes
 * Shows both minified and gzipped sizes
 */
function showSizes() {
  console.log('File sizes:');
  console.log('===========');
  
  const files = [
    'pith.min.css',
    'pith.min.js'
  ];
  
  let totalSize = 0;
  let totalGzipped = 0;
  
  files.forEach(file => {
    const filePath = path.join(distDir, file);
    
    if (fs.existsSync(filePath)) {
      // Get minified size
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalSize += stats.size;
      
      // Get gzipped size
      try {
        execSync(`gzip -c ${filePath} > ${filePath}.gz`, { cwd: __dirname });
        const gzStats = fs.statSync(`${filePath}.gz`);
        const gzSizeKB = (gzStats.size / 1024).toFixed(2);
        totalGzipped += gzStats.size;
        
        console.log(`${file}:`);
        console.log(`  Minified: ${sizeKB} KB`);
        console.log(`  Gzipped:  ${gzSizeKB} KB`);
        
        // Clean up gz file
        fs.unlinkSync(`${filePath}.gz`);
      } catch (error) {
        console.log(`${file}: ${sizeKB} KB (minified)`);
      }
    }
  });
  
  console.log('\nTotal:');
  console.log(`  Minified: ${(totalSize / 1024).toFixed(2)} KB`);
  console.log(`  Gzipped:  ${(totalGzipped / 1024).toFixed(2)} KB`);
  
  // Check if we're under the 14KB target
  const targetKB = 14;
  const actualKB = (totalGzipped / 1024).toFixed(2);
  
  if (totalGzipped / 1024 <= targetKB) {
    console.log(`\n✓ Under ${targetKB}KB target! (${actualKB} KB)`);
  } else {
    console.log(`\n⚠ Over ${targetKB}KB target (${actualKB} KB)`);
  }
}

// Run the build
buildJS();
buildCSS();
showSizes();

console.log('\n✓ Build complete!');

