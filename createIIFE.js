const jiife = require('jiife');
const xl = 'node_modules/xtal-latx/';
jiife.processFiles([xl + 'define.js', xl + 'xtal-latx.js', 'node_modules/ava-pwar/cors-anywhere.js', 'xtal-link-preview.js'], 'xtal-link-preview.iife.js');