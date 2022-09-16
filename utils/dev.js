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
    watch: {
        onRebuild(error, result) {
          if (error) console.error('watch build failed:', error)
          else console.log('watch build succeeded:', result)
        },
      },
    outdir: './dist/',
    loader: { '.png': 'copy', '.json': 'copy', '.eot': 'file', '.woff': 'file', '.woff2': 'file', '.ttf': 'file', '.svg': 'file', '.html': 'file' }
}).catch(() => process.exit(1))