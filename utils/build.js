require('esbuild').build({
  entryPoints: [
      "./src/manifest.json",
      "./src/img/icon-34.png",
      "./src/img/icon-128.png",
      "./src/css/content.css",
      "./src/js/content.js",
      "./src/js/background.js",
  ],
  bundle: true,
  // minify: true,
  // sourcemap: 'inline',
  target: ["chrome89", "firefox91", "safari15", "ios15"],
  outdir: './dist/',
  loader: { '.png': 'copy', '.json': 'copy', '.eot': 'file', '.woff': 'file', '.woff2': 'file', '.ttf': 'file', '.svg': 'file', '.html': 'file' }
}).catch(() => process.exit(1))