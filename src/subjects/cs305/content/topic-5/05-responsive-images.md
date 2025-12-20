# Responsive Images

Responsive images adapt to different screen sizes, resolutions, and device capabilities. Proper image optimization is crucial for performance, especially on mobile devices with limited bandwidth.

## The Problem with Fixed Images

Traditional fixed-size images waste bandwidth and hurt performance:

```html
<!-- Bad: Same large image for all devices -->
<img src="large-image-3000px.jpg" alt="Photo">
<!-- Mobile users download a 2MB image when 200KB would suffice -->
```

## Basic Responsive Image

The simplest responsive image uses CSS to scale within its container:

```html
<img src="photo.jpg" alt="Photo">
```

```css
img {
  max-width: 100%;
  height: auto;
}
```

This makes images fluid, but still downloads the same file regardless of screen size.

## The srcset Attribute

The `srcset` attribute allows you to specify multiple image sources for different screen widths or pixel densities.

### Width Descriptors

Provide images at different widths and let the browser choose.

```html
<img
  src="small.jpg"
  srcset="
    small.jpg 400w,
    medium.jpg 800w,
    large.jpg 1200w,
    xlarge.jpg 1600w
  "
  alt="Responsive image">
```

The `w` descriptor tells the browser each image's intrinsic width:
- `small.jpg` is 400 pixels wide
- `medium.jpg` is 800 pixels wide
- `large.jpg` is 1200 pixels wide
- `xlarge.jpg` is 1600 pixels wide

### The sizes Attribute

The `sizes` attribute tells the browser how wide the image will be displayed at different viewport sizes.

```html
<img
  src="small.jpg"
  srcset="
    small.jpg 400w,
    medium.jpg 800w,
    large.jpg 1200w
  "
  sizes="
    (max-width: 600px) 100vw,
    (max-width: 1200px) 50vw,
    33vw
  "
  alt="Responsive image">
```

How it works:
- On screens ≤600px: image is 100% viewport width
- On screens ≤1200px: image is 50% viewport width
- On larger screens: image is 33% viewport width

The browser uses this information to select the most appropriate image from `srcset`.

### Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Images</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin: 20px 0;
    }

    @media (min-width: 600px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 900px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  </style>
</head>
<body>
  <h1>Responsive Image Gallery</h1>

  <div class="grid">
    <img
      src="photo1-400.jpg"
      srcset="
        photo1-400.jpg 400w,
        photo1-800.jpg 800w,
        photo1-1200.jpg 1200w
      "
      sizes="
        (max-width: 600px) 100vw,
        (max-width: 900px) 50vw,
        33vw
      "
      alt="Photo 1">

    <img
      src="photo2-400.jpg"
      srcset="
        photo2-400.jpg 400w,
        photo2-800.jpg 800w,
        photo2-1200.jpg 1200w
      "
      sizes="
        (max-width: 600px) 100vw,
        (max-width: 900px) 50vw,
        33vw
      "
      alt="Photo 2">

    <img
      src="photo3-400.jpg"
      srcset="
        photo3-400.jpg 400w,
        photo3-800.jpg 800w,
        photo3-1200.jpg 1200w
      "
      sizes="
        (max-width: 600px) 100vw,
        (max-width: 900px) 50vw,
        33vw
      "
      alt="Photo 3">
  </div>
</body>
</html>
```

## Pixel Density Descriptors

For Retina and high-DPI displays, use pixel density descriptors (`x`).

```html
<img
  src="logo.png"
  srcset="
    logo.png 1x,
    logo@2x.png 2x,
    logo@3x.png 3x
  "
  alt="Company logo">
```

- `1x`: Standard displays (96 DPI)
- `2x`: Retina displays (192 DPI)
- `3x`: Ultra-high-DPI displays (288 DPI)

### Use Case: Icons and Logos

```html
<!-- Logo that looks sharp on all displays -->
<img
  src="logo-100w.png"
  srcset="
    logo-100w.png 1x,
    logo-200w.png 2x,
    logo-300w.png 3x
  "
  width="100"
  height="50"
  alt="Company Logo">
```

## The Picture Element

The `<picture>` element provides more control, allowing you to specify different images based on media queries or image formats.

### Art Direction

Show different images at different screen sizes (not just scaled versions).

```html
<picture>
  <!-- Mobile: Portrait crop -->
  <source
    media="(max-width: 600px)"
    srcset="photo-mobile-portrait.jpg">

  <!-- Tablet: Square crop -->
  <source
    media="(max-width: 1200px)"
    srcset="photo-tablet-square.jpg">

  <!-- Desktop: Landscape crop -->
  <img src="photo-desktop-landscape.jpg" alt="Photo">
</picture>
```

### Format Selection

Serve modern image formats with fallbacks.

```html
<picture>
  <!-- Try AVIF first (best compression) -->
  <source
    type="image/avif"
    srcset="photo.avif">

  <!-- Try WebP (good compression, wide support) -->
  <source
    type="image/webp"
    srcset="photo.webp">

  <!-- Fallback to JPEG (universal support) -->
  <img src="photo.jpg" alt="Photo">
</picture>
```

### Combining Everything

```html
<picture>
  <!-- AVIF for modern browsers -->
  <source
    type="image/avif"
    srcset="
      photo-400.avif 400w,
      photo-800.avif 800w,
      photo-1200.avif 1200w
    "
    sizes="(max-width: 600px) 100vw, 50vw">

  <!-- WebP for most browsers -->
  <source
    type="image/webp"
    srcset="
      photo-400.webp 400w,
      photo-800.webp 800w,
      photo-1200.webp 1200w
    "
    sizes="(max-width: 600px) 100vw, 50vw">

  <!-- JPEG fallback -->
  <img
    src="photo-400.jpg"
    srcset="
      photo-400.jpg 400w,
      photo-800.jpg 800w,
      photo-1200.jpg 1200w
    "
    sizes="(max-width: 600px) 100vw, 50vw"
    alt="Photo">
</picture>
```

## Lazy Loading

Defer loading images until they're needed (near viewport).

### Native Lazy Loading

```html
<!-- Native browser lazy loading -->
<img src="photo.jpg" alt="Photo" loading="lazy">

<!-- Eager loading (default, immediate) -->
<img src="hero.jpg" alt="Hero" loading="eager">
```

### When to Use

```html
<!-- Above the fold: Load immediately -->
<img src="hero.jpg" alt="Hero" loading="eager">

<!-- Below the fold: Lazy load -->
<img src="photo1.jpg" alt="Photo" loading="lazy">
<img src="photo2.jpg" alt="Photo" loading="lazy">
<img src="photo3.jpg" alt="Photo" loading="lazy">
```

### JavaScript Lazy Loading (for more control)

```html
<img
  data-src="photo.jpg"
  alt="Photo"
  class="lazy">
```

```javascript
// Intersection Observer for lazy loading
const lazyImages = document.querySelectorAll('img.lazy');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
```

## Background Images

Responsive background images using CSS.

### Using Media Queries

```css
.hero {
  background-image: url('hero-small.jpg');
  background-size: cover;
  background-position: center;
  min-height: 400px;
}

@media (min-width: 768px) {
  .hero {
    background-image: url('hero-medium.jpg');
  }
}

@media (min-width: 1200px) {
  .hero {
    background-image: url('hero-large.jpg');
  }
}

/* High DPI displays */
@media (min-width: 1200px) and (min-resolution: 2dppx) {
  .hero {
    background-image: url('hero-large@2x.jpg');
  }
}
```

### Using image-set()

```css
.hero {
  background-image: image-set(
    url('hero.jpg') 1x,
    url('hero@2x.jpg') 2x,
    url('hero@3x.jpg') 3x
  );
}

/* With modern formats */
.hero {
  background-image: image-set(
    url('hero.avif') type('image/avif'),
    url('hero.webp') type('image/webp'),
    url('hero.jpg') type('image/jpeg')
  );
}
```

## Object-fit for Image Behavior

Control how images fill their containers.

```css
.cover {
  width: 100%;
  height: 400px;
  object-fit: cover; /* Crop to fill */
  object-position: center;
}

.contain {
  width: 100%;
  height: 400px;
  object-fit: contain; /* Scale to fit, preserve aspect ratio */
}

.fill {
  width: 100%;
  height: 400px;
  object-fit: fill; /* Stretch to fill */
}

.scale-down {
  width: 100%;
  height: 400px;
  object-fit: scale-down; /* Contain or smaller */
}

.none {
  width: 100%;
  height: 400px;
  object-fit: none; /* Keep original size */
}
```

### Practical Example

```html
<div class="card">
  <img
    src="photo.jpg"
    alt="Photo"
    class="card-image">
  <div class="card-content">
    <h3>Card Title</h3>
    <p>Card description text.</p>
  </div>
</div>
```

```css
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
}
```

## Aspect Ratio Boxes

Maintain aspect ratio while images load.

```css
/* Using aspect-ratio property (modern) */
.image-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Padding hack (legacy support) */
.image-container-legacy {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
}

.image-container-legacy img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## Performance Optimization

### Image Formats Comparison

- **JPEG**: Good for photos, lossy compression
- **PNG**: Good for graphics/transparency, lossless
- **WebP**: 25-35% smaller than JPEG/PNG, wide support
- **AVIF**: 50% smaller than JPEG, growing support
- **SVG**: Vector format, perfect for icons/logos

### Compression Guidelines

```
Recommended file sizes:
- Mobile: < 100KB per image
- Tablet: < 200KB per image
- Desktop: < 300KB per image
- Hero images: < 500KB
```

### Tools for Optimization

- ImageOptim
- TinyPNG/TinyJPG
- Squoosh
- Sharp (Node.js)
- ImageMagick

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Images Complete</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
    }

    /* Hero with background image */
    .hero {
      background-image: url('hero-small.jpg');
      background-size: cover;
      background-position: center;
      min-height: 50vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
    }

    @media (min-width: 768px) {
      .hero {
        background-image: url('hero-large.jpg');
        min-height: 70vh;
      }
    }

    /* Gallery grid */
    .gallery {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    @media (min-width: 600px) {
      .gallery {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 900px) {
      .gallery {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .gallery-item {
      aspect-ratio: 4 / 3;
      overflow: hidden;
      border-radius: 8px;
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .gallery-item:hover img {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <!-- Hero section -->
  <div class="hero">
    <h1>Responsive Images Demo</h1>
  </div>

  <!-- Image gallery -->
  <div class="gallery">
    <!-- Modern image with all features -->
    <div class="gallery-item">
      <picture>
        <source
          type="image/avif"
          srcset="
            photo1-400.avif 400w,
            photo1-800.avif 800w
          "
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw">

        <source
          type="image/webp"
          srcset="
            photo1-400.webp 400w,
            photo1-800.webp 800w
          "
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw">

        <img
          src="photo1-400.jpg"
          srcset="
            photo1-400.jpg 400w,
            photo1-800.jpg 800w
          "
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          alt="Photo 1"
          loading="lazy">
      </picture>
    </div>

    <!-- Repeat for more images -->
    <div class="gallery-item">
      <img
        src="photo2-400.jpg"
        srcset="
          photo2-400.jpg 400w,
          photo2-800.jpg 800w
        "
        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
        alt="Photo 2"
        loading="lazy">
    </div>

    <div class="gallery-item">
      <img
        src="photo3-400.jpg"
        srcset="
          photo3-400.jpg 400w,
          photo3-800.jpg 800w
        "
        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
        alt="Photo 3"
        loading="lazy">
    </div>
  </div>
</body>
</html>
```

## Best Practices

1. **Always include alt text** for accessibility
2. **Use modern formats** (WebP, AVIF) with fallbacks
3. **Lazy load** below-the-fold images
4. **Optimize file sizes** - compress images
5. **Specify dimensions** to prevent layout shift
6. **Use srcset and sizes** for resolution switching
7. **Use picture** for art direction
8. **Set max-width: 100%** for fluid images
9. **Consider CDNs** for automatic optimization
10. **Test on real devices** with various network speeds

## Summary

Responsive images are essential for performance and user experience:

- **srcset and sizes** - Resolution switching
- **picture element** - Art direction and format selection
- **Lazy loading** - Defer off-screen images
- **Modern formats** - WebP, AVIF for smaller files
- **object-fit** - Control image behavior in containers
- **Aspect ratio** - Prevent layout shift
- **Optimization** - Compress and resize appropriately

Properly implemented responsive images dramatically improve page load times and create better experiences across all devices.
