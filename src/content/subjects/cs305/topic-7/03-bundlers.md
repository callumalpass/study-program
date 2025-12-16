# Bundlers

Bundlers are build tools that combine multiple JavaScript files and their dependencies into optimized bundles for the browser. Modern bundlers go beyond simple concatenation, offering features like code splitting, tree shaking, and asset optimization. Understanding bundlers is essential for building performant web applications.

## Why Bundlers?

Bundlers solve several problems in modern web development.

```javascript
// Problem 1: Multiple HTTP requests
// Without bundler:
<script src="utils.js"></script>
<script src="api.js"></script>
<script src="components.js"></script>
<script src="app.js"></script>
// 4 separate HTTP requests

// With bundler:
<script src="bundle.js"></script>
// 1 HTTP request containing all code

// Problem 2: Module systems
// Browsers don't natively support all module formats
import { add } from './math.js'; // ES modules
const utils = require('./utils'); // CommonJS
define(['jquery'], function($) {}); // AMD

// Bundler converts all formats to browser-compatible code

// Problem 3: Dependency resolution
// app.js depends on lodash
import _ from 'lodash';

// lodash has its own dependencies
// Bundler resolves entire dependency tree automatically

// Problem 4: Code optimization
// Before bundling: 500KB of JavaScript
// After bundling: 150KB (minified + tree shaken + compressed)
```

## Webpack

Webpack is the most popular and feature-rich bundler.

```javascript
// webpack.config.js - Basic configuration
const path = require('path');

module.exports = {
  // Entry point - where bundling starts
  entry: './src/index.js',

  // Output - where bundle is written
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true // Clean dist folder before build
  },

  // Mode - development or production
  mode: 'production',

  // Loaders - Transform files
  module: {
    rules: [
      // Babel - Transpile JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      // Images
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource'
      },

      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource'
      }
    ]
  },

  // Plugins - Additional functionality
  plugins: [],

  // Development server
  devServer: {
    static: './dist',
    hot: true,
    port: 3000
  }
};

// Multiple entry points
module.exports = {
  entry: {
    app: './src/app.js',
    admin: './src/admin.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

// Output:
// dist/app.bundle.js
// dist/admin.bundle.js
```

## Webpack Plugins

Plugins extend webpack's functionality.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // ... other config

  plugins: [
    // Generate HTML file
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'My App',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),

    // Extract CSS to separate file
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),

    // Clean output directory
    new CleanWebpackPlugin(),

    // Copy static files
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: 'public' }
      ]
    }),

    // Define environment variables
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    // Bundle analyzer
    new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()
  ]
};
```

## Code Splitting

Code splitting divides your bundle into smaller chunks.

```javascript
// Dynamic imports - Split point
// Before:
import { heavyFunction } from './heavy.js';
heavyFunction();

// After - Lazy load when needed:
button.addEventListener('click', async () => {
  const { heavyFunction } = await import('./heavy.js');
  heavyFunction();
});

// Webpack configuration for code splitting
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // Vendor bundle - node_modules
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        },

        // Common code used in multiple chunks
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  }
};

// React lazy loading
import React, { lazy, Suspense } from 'react';

const AdminPanel = lazy(() => import('./AdminPanel'));
const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminPanel />
      <Dashboard />
    </Suspense>
  );
}

// Named chunks
import(/* webpackChunkName: "admin" */ './admin').then(module => {
  // admin.bundle.js will be created
});

import(/* webpackChunkName: "dashboard" */ './dashboard').then(module => {
  // dashboard.bundle.js will be created
});
```

## Tree Shaking

Tree shaking removes unused code from the bundle.

```javascript
// utils.js - Library with multiple exports
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  return a / b;
}

// app.js - Only uses one function
import { add } from './utils.js';

console.log(add(5, 3));

// Final bundle only includes 'add' function
// subtract, multiply, divide are removed (tree shaken)

// Webpack configuration for tree shaking
module.exports = {
  mode: 'production', // Enables tree shaking
  optimization: {
    usedExports: true, // Mark unused exports
    minimize: true, // Remove dead code
    sideEffects: false // No side effects in modules
  }
};

// package.json - Specify side effects
{
  "name": "my-library",
  "sideEffects": false // No files have side effects
}

// Or specify files with side effects:
{
  "sideEffects": [
    "*.css",
    "*.scss",
    "src/polyfills.js"
  ]
}

// Code that prevents tree shaking
// Bad - Has side effects
export function setupAnalytics() {
  window.analytics = new Analytics();
  analytics.init();
}

// Good - Pure function
export function createAnalytics(config) {
  return new Analytics(config);
}
```

## Vite

Vite is a modern build tool that's significantly faster than webpack.

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // Plugins
  plugins: [react()],

  // Development server
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },

  // Build options
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash', 'axios']
        }
      }
    }
  },

  // Path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components')
    }
  },

  // Define global constants
  define: {
    __API_URL__: JSON.stringify(process.env.API_URL)
  }
});

// Why Vite is faster:
// 1. Uses native ES modules in development (no bundling)
// 2. Pre-bundles dependencies with esbuild
// 3. Hot Module Replacement (HMR) that's lightning fast
// 4. Only rebuilds changed modules

// Development: No bundling
// import { add } from './utils.js';
// Browser directly loads utils.js via ES modules

// Production: Full bundling with Rollup
// Optimized, minified, code-split bundles
```

## Rollup

Rollup specializes in creating libraries and is known for efficient tree shaking.

```javascript
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  // Entry point
  input: 'src/index.js',

  // Output formats
  output: [
    // ES module
    {
      file: 'dist/my-library.esm.js',
      format: 'esm',
      sourcemap: true
    },

    // CommonJS
    {
      file: 'dist/my-library.cjs.js',
      format: 'cjs',
      sourcemap: true
    },

    // UMD (browser)
    {
      file: 'dist/my-library.umd.js',
      format: 'umd',
      name: 'MyLibrary',
      sourcemap: true
    }
  ],

  // Plugins
  plugins: [
    // Resolve node_modules
    resolve(),

    // Convert CommonJS to ES modules
    commonjs(),

    // Transpile with Babel
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),

    // Minify
    terser()
  ],

  // External dependencies (not bundled)
  external: ['react', 'react-dom']
};

// Multiple bundles
export default [
  // Development build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/my-library.js',
      format: 'umd',
      name: 'MyLibrary'
    },
    plugins: [resolve(), commonjs(), babel()]
  },

  // Production build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/my-library.min.js',
      format: 'umd',
      name: 'MyLibrary'
    },
    plugins: [resolve(), commonjs(), babel(), terser()]
  }
];
```

## Parcel

Parcel is a zero-configuration bundler.

```javascript
// No configuration needed!
// Just point it to your entry file

// package.json
{
  "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html"
  }
}

// Parcel automatically:
// - Detects file types
// - Installs plugins
// - Applies transformations
// - Handles assets

// Optional configuration: .parcelrc
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.svg": ["@parcel/transformer-svg-react"]
  }
}

// Features:
// - Zero config
// - Fast (uses worker threads)
// - Hot module replacement
// - Automatic transpilation
// - Code splitting
// - Tree shaking
```

## Bundle Optimization

Techniques to optimize bundle size and performance.

```javascript
// 1. Code splitting
// Split large bundles into smaller chunks
import(/* webpackChunkName: "admin" */ './admin');

// 2. Tree shaking
// Remove unused exports
import { specificFunction } from 'library';

// 3. Minification
// Webpack production mode enables minification automatically
mode: 'production'

// 4. Compression
// Webpack plugin for gzip/brotli
const CompressionPlugin = require('compression-webpack-plugin');

plugins: [
  new CompressionPlugin({
    algorithm: 'gzip',
    test: /\.(js|css|html|svg)$/,
    threshold: 10240,
    minRatio: 0.8
  })
]

// 5. Content hashing for caching
output: {
  filename: '[name].[contenthash].js',
  // bundle.a1b2c3d4.js
  // Hash changes only when content changes
}

// 6. Lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// 7. External dependencies
// Don't bundle libraries loaded from CDN
externals: {
  react: 'React',
  'react-dom': 'ReactDOM'
}

// 8. Source maps for debugging
// Production: cheaper-source-map
// Development: eval-source-map
devtool: 'source-map'

// 9. Analyze bundle size
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

plugins: [
  new BundleAnalyzerPlugin()
]

// 10. Remove console logs in production
const TerserPlugin = require('terser-webpack-plugin');

optimization: {
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    })
  ]
}
```

## Asset Handling

Bundlers can process various asset types.

```javascript
// Webpack asset handling
module.exports = {
  module: {
    rules: [
      // Images
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8KB - inline as base64
          }
        },
        generator: {
          filename: 'images/[name].[hash][ext]'
        }
      },

      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]'
        }
      },

      // CSS
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },

      // SCSS
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },

      // JSON
      {
        test: /\.json$/,
        type: 'json'
      }
    ]
  }
};

// Using assets in code
import logo from './assets/logo.png';
import styles from './styles.css';
import data from './data.json';

const img = document.createElement('img');
img.src = logo; // /images/logo.a1b2c3.png

console.log(data.users); // Parsed JSON
```

## Development vs Production

Different configurations for different environments.

```javascript
// webpack.common.js - Shared configuration
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};

// webpack.dev.js - Development configuration
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: './dist',
    hot: true,
    port: 3000
  }
});

// webpack.prod.js - Production configuration
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
});

// package.json scripts
{
  "scripts": {
    "start": "webpack serve --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  }
}
```

## Comparison

```javascript
const bundlerComparison = {
  webpack: {
    pros: [
      'Most features',
      'Largest ecosystem',
      'Highly configurable',
      'Battle-tested'
    ],
    cons: [
      'Complex configuration',
      'Slower than alternatives',
      'Steep learning curve'
    ],
    bestFor: 'Large applications, complex requirements'
  },

  vite: {
    pros: [
      'Lightning fast',
      'Simple configuration',
      'Great DX',
      'Modern features'
    ],
    cons: [
      'Newer (less mature)',
      'Smaller ecosystem',
      'Production uses Rollup'
    ],
    bestFor: 'Modern apps, React/Vue projects'
  },

  rollup: {
    pros: [
      'Best tree shaking',
      'Efficient output',
      'Great for libraries',
      'ES module focused'
    ],
    cons: [
      'Limited plugin ecosystem',
      'Less suited for apps',
      'More config needed'
    ],
    bestFor: 'Libraries, packages'
  },

  parcel: {
    pros: [
      'Zero configuration',
      'Fast',
      'Easy to use',
      'Good defaults'
    ],
    cons: [
      'Less control',
      'Smaller ecosystem',
      'Less documentation'
    ],
    bestFor: 'Small-medium apps, prototypes'
  }
};
```

## Conclusion

Bundlers are essential tools for modern web development, transforming source code into optimized production bundles. Webpack offers the most features and configurability, Vite provides the best development experience and speed, Rollup excels at library bundling with superior tree shaking, and Parcel offers simplicity with zero configuration. Understanding bundlers, their features like code splitting and tree shaking, and how to optimize bundles is crucial for building fast, efficient web applications.
