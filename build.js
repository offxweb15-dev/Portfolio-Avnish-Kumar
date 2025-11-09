const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Configuration
const CONFIG = {
  // Source and output directories
  srcDir: '.',
  distDir: 'dist',
  
  // File patterns
  htmlFiles: ['**/*.html'],
  cssFiles: ['**/*.css', '!**/*.min.css'],
  jsFiles: ['**/*.js', '!**/*.min.js', '!node_modules/**'],
  
  // Optimization settings
  minifyHTML: true,
  minifyCSS: true,
  minifyJS: true,
  optimizeImages: true,
  
  // Image optimization settings
  imageFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  imageQuality: 80,
  
  // Service worker settings
  swSrc: 'sw.js',
  swDest: 'dist/sw.js'
};

// Install required npm packages if not already installed
function installDependencies() {
  const dependencies = [
    'html-minifier',
    'clean-css',
    'terser',
    'imagemin-cli',
    'imagemin-mozjpeg',
    'imagemin-pngquant',
    'imagemin-gifsicle',
    'imagemin-svgo',
    'imagemin-webp'
  ];

  console.log('Checking dependencies...');
  
  try {
    const installedPackages = execSync('npm list --json --depth=0').toString();
    const installed = JSON.parse(installedPackages).dependencies || {};
    
    const missingDeps = dependencies.filter(dep => !installed[dep]);
    
    if (missingDeps.length > 0) {
      console.log(`Installing missing dependencies: ${missingDeps.join(', ')}`);
      execSync(`npm install --save-dev ${missingDeps.join(' ')}`, { stdio: 'inherit' });
    } else {
      console.log('All dependencies are already installed.');
    }
  } catch (error) {
    console.error('Error checking/installing dependencies:', error);
    process.exit(1);
  }
}

// Minify HTML files
async function minifyHTML() {
  if (!CONFIG.minifyHTML) return;
  
  console.log('Minifying HTML files...');
  
  try {
    const htmlMinifier = require('html-minifier');
    const files = await findFiles(CONFIG.htmlFiles);
    
    for (const file of files) {
      const content = await readFile(file, 'utf8');
      const result = htmlMinifier.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true
      });
      
      await writeFile(file, result);
      console.log(`Minified: ${file}`);
    }
  } catch (error) {
    console.error('Error minifying HTML:', error);
  }
}

// Minify CSS files
async function minifyCSS() {
  if (!CONFIG.minifyCSS) return;
  
  console.log('Minifying CSS files...');
  
  try {
    const CleanCSS = require('clean-css');
    const files = await findFiles(CONFIG.cssFiles);
    
    for (const file of files) {
      const content = await readFile(file, 'utf8');
      const result = new CleanCSS({
        level: 2,
        format: 'keep-breaks'
      }).minify(content).styles;
      
      await writeFile(file, result);
      console.log(`Minified: ${file}`);
    }
  } catch (error) {
    console.error('Error minifying CSS:', error);
  }
}

// Minify JavaScript files
async function minifyJS() {
  if (!CONFIG.minifyJS) return;
  
  console.log('Minifying JavaScript files...');
  
  try {
    const { minify } = require('terser');
    const files = await findFiles(CONFIG.jsFiles);
    
    for (const file of files) {
      const content = await readFile(file, 'utf8');
      const result = await minify(content, {
        compress: true,
        mangle: true,
        format: {
          comments: false
        }
      });
      
      await writeFile(file, result.code);
      console.log(`Minified: ${file}`);
    }
  } catch (error) {
    console.error('Error minifying JavaScript:', error);
  }
}

// Optimize images
async function optimizeImagesTask() {
  if (!CONFIG.optimizeImages) return;
  
  console.log('Optimizing images...');
  
  try {
    const imagemin = require('imagemin');
    const imageminMozjpeg = require('imagemin-mozjpeg');
    const imageminPngquant = require('imagemin-pngquant');
    const imageminGifsicle = require('imagemin-gifsicle');
    const imageminSvgo = require('imagemin-svgo');
    const imageminWebp = require('imagemin-webp');
    
    // Process each image format
    for (const format of CONFIG.imageFormats) {
      const files = await findFiles([`**/*.${format}`, '!node_modules/**']);
      
      for (const file of files) {
        await imagemin([file], {
          destination: path.dirname(file),
          plugins: [
            imageminMozjpeg({ quality: CONFIG.imageQuality }),
            imageminPngquant({
              quality: [CONFIG.imageQuality / 100, CONFIG.imageQuality / 100]
            }),
            imageminGifsicle(),
            imageminSvgo()
          ]
        });
        
        console.log(`Optimized: ${file}`);
        
        // Convert to WebP if not already WebP
        if (format !== 'webp') {
          const webpFile = file.replace(/\.\w+$/, '.webp');
          await imagemin([file], {
            destination: path.dirname(file),
            plugins: [
              imageminWebp({ quality: CONFIG.imageQuality })
            ]
          });
          
          console.log(`Converted to WebP: ${webpFile}`);
        }
      }
    }
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

// Helper function to find files matching patterns
async function findFiles(patterns) {
  const { glob } = await import('glob');
  let files = [];
  
  for (const pattern of patterns) {
    const matches = await glob(pattern, { nodir: true, ignore: 'node_modules/**' });
    files = [...new Set([...files, ...matches])];
  }
  
  return files;
}

// Main build function
async function build() {
  console.log('Starting build process...');
  
  try {
    // Install dependencies if needed
    await installDependencies();
    
    // Run optimization tasks
    await minifyHTML();
    await minifyCSS();
    await minifyJS();
    await optimizeImagesTask();
    
    console.log('\nBuild completed successfully!');
    console.log('Your optimized files are ready for deployment.');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Run the build process
build();
