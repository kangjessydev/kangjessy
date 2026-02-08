export interface ImageValidationResult {
  valid: boolean;
  error?: string;
  width?: number;
  height?: number;
}

export interface OptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export const MIN_WIDTH = 1200;

/**
 * Validates image dimensions before upload.
 * Strictly blocks if below MIN_WIDTH.
 */
export const validateImage = (file: File): Promise<ImageValidationResult> => {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve({ valid: false, error: 'File must be an image' });
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      if (img.width < MIN_WIDTH) {
        resolve({
          valid: false,
          error: `Image resolution too low (${img.width}px). Minimum width required is ${MIN_WIDTH}px for premium quality.`,
          width: img.width,
          height: img.height
        });
      } else {
        resolve({ valid: true, width: img.width, height: img.height });
      }
    };
    img.onerror = () => {
      resolve({ valid: false, error: 'Failed to load image metadata' });
    };
  });
};

/**
 * Optimizes image: converts to WebP and reduces size/quality.
 * Totally free using Canvas API.
 */
export const optimizeImage = (file: File, options: OptimizationOptions = {}): Promise<File> => {
  const { maxWidth = 2000, quality = 0.8 } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions if it exceeds maxWidth
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas to Blob conversion failed'));
            return;
          }

          // Create new file from blob with .webp extension
          const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
          const optimizedFile = new File([blob], newFileName, {
            type: 'image/webp',
            lastModified: Date.now()
          });

          resolve(optimizedFile);
        },
        'image/webp',
        quality
      );
    };
    img.onerror = () => reject(new Error('Failed to load image for optimization'));
  });
};
