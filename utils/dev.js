require('esbuild').build({
    entryPoints: [
      "./src/css/content.css",
      "./src/js/content.js",
    ],
    bundle: true,
    target: ["chrome89", "firefox91", "safari15", "ios15"],
    watch: {
        onRebuild(error, result) {
          if (error) console.error('watch build failed:', error)
          else console.log('watch build succeeded:', result)
        },
      },
    outdir: './dev/',
    loader: { '.png': 'copy', '.json': 'copy', '.eot': 'file', '.woff': 'file', '.woff2': 'file', '.ttf': 'file', '.svg': 'file', '.html': 'file' }
}).catch(() => process.exit(1))