const jiife = require('jiife');
const xl = 'node_modules/xtal-latx/';
jiife.processFiles([xl + 'define.js', xl + 'xtal-latx.js', 'node_modules/ava-pwar/cors-anywhere.js', 'xtal-link-preview-base.js', 'xtal-link-preview.js'], 'dist/xtal-link-preview.iife.js');
jiife.processFiles([xl + 'define.js', xl + 'xtal-latx.js', 'node_modules/ava-pwar/cors-anywhere.js', 'xtal-link-preview-base.js'], 'dist/xtal-link-preview-base.iife.js');