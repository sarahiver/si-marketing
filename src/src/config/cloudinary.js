// Cloudinary Configuration for S&I Weddings
// Used for optimized image delivery

const cloudinaryConfig = {
  cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
};

// Generate optimized image URL
export const getImageUrl = (publicId, options = {}) => {
  if (!cloudinaryConfig.cloudName) {
    console.warn('Cloudinary not configured');
    return publicId; // Return original if not configured
  }

  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = options;

  let transformations = `q_${quality},f_${format}`;
  
  if (width) transformations += `,w_${width}`;
  if (height) transformations += `,h_${height}`;
  if (crop) transformations += `,c_${crop}`;

  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformations}/${publicId}`;
};

// Responsive image srcset generator
export const getResponsiveImage = (publicId, sizes = [400, 800, 1200, 1600]) => {
  if (!cloudinaryConfig.cloudName) return { src: publicId, srcSet: '' };

  const srcSet = sizes
    .map(size => `${getImageUrl(publicId, { width: size })} ${size}w`)
    .join(', ');

  return {
    src: getImageUrl(publicId, { width: sizes[1] }),
    srcSet,
  };
};

// Background image with blur placeholder
export const getBackgroundImage = (publicId, options = {}) => {
  const fullImage = getImageUrl(publicId, options);
  const placeholder = getImageUrl(publicId, { 
    ...options, 
    width: 50, 
    quality: 30,
    effect: 'blur:1000'
  });

  return { fullImage, placeholder };
};

export default cloudinaryConfig;

/*
  CLOUDINARY SETUP:
  
  1. Create account at cloudinary.com
  2. Get your Cloud Name from Dashboard
  3. Add to .env:
     REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
     REACT_APP_CLOUDINARY_API_KEY=your-api-key (optional for uploads)
  
  USAGE EXAMPLES:
  
  // Simple image
  <img src={getImageUrl('wedding/hero-image')} alt="Hero" />
  
  // Responsive image
  const { src, srcSet } = getResponsiveImage('wedding/couple');
  <img src={src} srcSet={srcSet} sizes="100vw" alt="Couple" />
  
  // Background with lazy loading
  const { fullImage, placeholder } = getBackgroundImage('wedding/bg');
*/
