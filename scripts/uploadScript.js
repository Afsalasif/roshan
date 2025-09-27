const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY ,
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Image dimensions for different variants (optimized for fast upload)
const IMAGE_VARIANTS = {
  desktop_landscape: { width: 1200, height: 800, quality: 80 }, // 3:2 ratio for desktop showcase
  desktop_square: { width: 800, height: 800, quality: 85 },     // Square for grid layouts
  mobile_portrait: { width: 400, height: 600, quality: 90 }     // 2:3 ratio for mobile (smallest file)
};

// Category mappings
const CATEGORIES = {
  washroom: { folder: 'washroom' },
  apartment: { folder: 'apartment' },
  bar: { folder: 'bar' },
  bedroom: { folder: 'bedroom' },
  dining: { folder: 'dining' },
  office: { folder: 'offfice' }, // Keeping the typo from original
  spa: { folder: 'spa' },
  villa: { folder: 'villa' }
};

// Helper function to get file size in MB
function getFileSizeInMB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2);
}

// Create optimized image variants locally (JPEG first for faster upload)
async function createOptimizedVariants(inputPath, outputDir, filename) {
  const variants = {};
  
  console.log(`   📏 Original file size: ${getFileSizeInMB(inputPath)}MB`);
  
  for (const [variantName, config] of Object.entries(IMAGE_VARIANTS)) {
    const outputPath = path.join(outputDir, `${filename}_${variantName}.jpg`);
    
    // Aggressive local optimization to get under 1MB
    await sharp(inputPath)
      .resize(config.width, config.height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: config.quality,
        progressive: true,
        mozjpeg: true // Better compression
      })
      .toFile(outputPath);
    
    const fileSize = getFileSizeInMB(outputPath);
    variants[variantName] = {
      path: outputPath,
      size: fileSize
    };
    
    console.log(`   ✓ ${variantName}: ${config.width}x${config.height} (${fileSize}MB)`);
    
    // If still over 1MB, compress more aggressively
    if (parseFloat(fileSize) > 1) {
      console.log(`   🔄 File too large (${fileSize}MB), compressing further...`);
      
      await sharp(inputPath)
        .resize(config.width, config.height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({
          quality: Math.max(config.quality - 20, 60), // Reduce quality more
          progressive: true,
          mozjpeg: true
        })
        .toFile(outputPath);
      
      const newSize = getFileSizeInMB(outputPath);
      variants[variantName].size = newSize;
      console.log(`   ✅ Compressed to: ${newSize}MB`);
    }
  }
  
  return variants;
}

// Upload pre-optimized image to Cloudinary (let Cloudinary handle WebP conversion)
async function uploadToCloudinary(filePath, folder, publicId, originalSize) {
  try {
    const uploadSize = getFileSizeInMB(filePath);
    console.log(`   📤 Uploading ${uploadSize}MB (was ${originalSize}MB)`);
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `interior-design/${folder}`,
      public_id: publicId,
      resource_type: 'image',
      // Let Cloudinary convert to WebP automatically
      fetch_format: 'auto',
      quality: 'auto:good',
      // Enable responsive breakpoints
      responsive_breakpoints: [
        {
          create_derived: true,
          bytes_step: 20000,
          min_width: 200,
          max_width: 1000,
          transformation: { fetch_format: 'auto' }
        }
      ]
    });
    
    console.log(`   ✅ Uploaded successfully`);
    return {
      url: result.secure_url,
      webp_url: result.secure_url.replace(/\.(jpg|png)/, '.webp'), // WebP version URL
      responsive: result.responsive_breakpoints
    };
    
  } catch (error) {
    console.error(`   ❌ Upload failed:`, error.message);
    throw error;
  }
}

// Process single category
async function processCategory(categoryName, categoryData) {
  console.log(`\n🎨 Processing ${categoryName} images...`);
  
  const sourceDir = path.join('public', 'images', categoryData.folder);
  const tempDir = path.join('temp', 'optimized', categoryName);
  
  // Create temp directory
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  
  // Check if source directory exists
  if (!fs.existsSync(sourceDir)) {
    console.log(`   ⚠️  Source directory not found: ${sourceDir}`);
    return [];
  }
  
  const processedImages = [];
  
  // Get all image files in the category
  const imageFiles = fs.readdirSync(sourceDir)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
    .sort();
  
  console.log(`   📁 Found ${imageFiles.length} images`);
  
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const filename = path.parse(file).name;
    const inputPath = path.join(sourceDir, file);
    const originalSize = getFileSizeInMB(inputPath);
    
    console.log(`\n📸 Processing ${file} (${originalSize}MB)...`);
    
    // Step 1: Create optimized variants locally
    const variants = await createOptimizedVariants(inputPath, tempDir, filename);
    
    // Step 2: Upload each optimized variant to Cloudinary
    const cloudinaryUrls = {};
    
    for (const [variantName, variantData] of Object.entries(variants)) {
      const publicId = `${filename}_${variantName}`;
      
      try {
        const uploadResult = await uploadToCloudinary(
          variantData.path, 
          categoryName, 
          publicId,
          originalSize
        );
        
        cloudinaryUrls[variantName] = {
          url: uploadResult.url,
          webp_url: uploadResult.webp_url,
          size_reduced: `${originalSize}MB → ${variantData.size}MB`
        };
        
        console.log(`   🎯 ${variantName} ready: ${uploadResult.webp_url}`);
        
      } catch (error) {
        console.error(`   ❌ Failed to upload ${variantName}:`, error.message);
        // Continue with other variants
      }
      
      // Clean up temp file immediately after upload
      try {
        fs.unlinkSync(variantData.path);
      } catch (err) {
        // Ignore cleanup errors
      }
    }
    
    // Add to processed images array
    processedImages.push({
      id: i + 1,
      originalName: filename,
      originalSize: originalSize,
      urls: cloudinaryUrls,
      alt: generateAltText(categoryName, i + 1)
    });
    
    console.log(`   ✅ ${filename} completed`);
  }
  
  console.log(`\n🎉 ${categoryName} completed: ${processedImages.length} images processed`);
  return processedImages;
}

// Generate appropriate alt text
function generateAltText(category, index) {
  const altTexts = {
    washroom: ['Modern Washroom Design', 'Elegant Washroom', 'Luxury Bathroom', 'Contemporary Washroom'],
    apartment: ['Cozy Apartment', 'Luxury Apartment', 'Modern Apartment', 'Elegant Living Space'],
    bar: ['Modern Bar Design', 'Classic Bar Design', 'Luxury Bar Interior', 'Contemporary Bar'],
    bedroom: ['Cozy Bedroom', 'Luxury Bedroom', 'Modern Bedroom', 'Elegant Bedroom'],
    dining: ['Elegant Dining Room', 'Modern Dining Room', 'Luxury Dining Space', 'Contemporary Dining'],
    office: ['Modern Office', 'Classic Office', 'Luxury Office', 'Contemporary Workspace'],
    spa: ['Relaxing Spa', 'Luxury Spa', 'Modern Spa', 'Tranquil Spa'],
    villa: ['Luxury Villa', 'Modern Villa', 'Elegant Villa', 'Contemporary Villa']
  };
  
  const categoryAlts = altTexts[category] || ['Interior Design'];
  return categoryAlts[index % categoryAlts.length];
}

// Generate new TypeScript data file
function generateNewDataFile(processedData) {
  const totalOriginalSize = Object.values(processedData)
    .flat()
    .reduce((sum, img) => sum + parseFloat(img.originalSize), 0);
  
  const dataFileContent = `// Auto-generated optimized image data
// Original total size: ${totalOriginalSize.toFixed(2)}MB
// Optimized for fast loading and WebP delivery via Cloudinary

interface ImageVariants {
  desktop_landscape: {
    url: string;
    webp_url: string;
    size_reduced: string;
  };
  desktop_square: {
    url: string;
    webp_url: string;
    size_reduced: string;
  };
  mobile_portrait: {
    url: string;
    webp_url: string;
    size_reduced: string;
  };
}

interface OptimizedImageDataItem {
  id: number;
  originalName: string;
  originalSize: string;
  urls: ImageVariants;
  alt: string;
}

interface OptimizedImageData {
  washroom: OptimizedImageDataItem[];
  apartment: OptimizedImageDataItem[];
  bar: OptimizedImageDataItem[];
  bedroom: OptimizedImageDataItem[];
  dining: OptimizedImageDataItem[];
  office: OptimizedImageDataItem[];
  spa: OptimizedImageDataItem[];
  villa: OptimizedImageDataItem[];
}

const optimizedImageData: OptimizedImageData = {
${Object.entries(processedData)
  .map(([category, images]) => {
    const imageItems = images.map(img => 
      `    { 
      id: ${img.id}, 
      originalName: '${img.originalName}',
      originalSize: '${img.originalSize}MB',
      urls: {
        desktop_landscape: {
          url: '${img.urls.desktop_landscape?.url || ''}',
          webp_url: '${img.urls.desktop_landscape?.webp_url || ''}',
          size_reduced: '${img.urls.desktop_landscape?.size_reduced || ''}'
        },
        desktop_square: {
          url: '${img.urls.desktop_square?.url || ''}',
          webp_url: '${img.urls.desktop_square?.webp_url || ''}',
          size_reduced: '${img.urls.desktop_square?.size_reduced || ''}'
        },
        mobile_portrait: {
          url: '${img.urls.mobile_portrait?.url || ''}',
          webp_url: '${img.urls.mobile_portrait?.webp_url || ''}',
          size_reduced: '${img.urls.mobile_portrait?.size_reduced || ''}'
        }
      },
      alt: '${img.alt}' 
    }`
    ).join(',\n');
    
    return `  ${category}: [\n${imageItems}\n  ]`;
  })
  .join(',\n')}
};

// Helper function to get WebP URL for modern browsers
export const getOptimalImageUrl = (image: OptimizedImageDataItem, variant: keyof ImageVariants, useWebP = true) => {
  return useWebP ? image.urls[variant].webp_url : image.urls[variant].url;
};

export type { OptimizedImageDataItem, ImageVariants };
export default optimizedImageData;
`;

  fs.writeFileSync('data/data/optimizedImageData.ts', dataFileContent);
  console.log('\n✅ Generated optimized image data file');
}

// Main execution function
async function main() {
  console.log('🚀 Starting intelligent image optimization...\n');
  console.log('📋 Process:');
  console.log('   1. Optimize images locally (get under 1MB)');
  console.log('   2. Upload optimized versions to Cloudinary');
  console.log('   3. Let Cloudinary handle WebP conversion');
  console.log('   4. Generate new data structure\n');
  
  // Create temp directory
  if (!fs.existsSync('temp/optimized')) {
    fs.mkdirSync('temp/optimized', { recursive: true });
  }
  
  const allProcessedData = {};
  const startTime = Date.now();
  
  try {
    // Process each category
    for (const [categoryName, categoryData] of Object.entries(CATEGORIES)) {
      allProcessedData[categoryName] = await processCategory(categoryName, categoryData);
      
      // Small delay between categories to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Generate new data file
    generateNewDataFile(allProcessedData);
    
    // Clean up temp directory
    fs.rmSync('temp', { recursive: true, force: true });
    
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);
    
    console.log('\n🎉 Optimization completed successfully!');
    console.log(`⏱️  Total time: ${duration} seconds`);
    
    console.log('\n📊 Summary:');
    let totalImages = 0;
    Object.entries(allProcessedData).forEach(([category, images]) => {
      const count = images.length;
      totalImages += count;
      console.log(`   ${category}: ${count} images × 3 variants = ${count * 3} optimized files`);
    });
    
    console.log(`\n🚀 Total: ${totalImages} images → ${totalImages * 3} optimized variants`);
    console.log('🌐 All images now served via Cloudinary CDN with automatic WebP delivery!');
    
  } catch (error) {
    console.error('\n❌ Error during processing:', error);
    
    // Clean up temp directory on error
    if (fs.existsSync('temp')) {
      fs.rmSync('temp', { recursive: true, force: true });
    }
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, processCategory, createOptimizedVariants };