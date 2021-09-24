exports.Package = class Package {
  publish() {
    return {
      vendor: {
        paths: {
          'resources/css': './publisher/next-css',
          'resources/js': './publisher/next-js'
        }
      },
      config: {
        paths: {
          'public/vercel.svg': './publisher/next-public/vercel.svg',
          'config/next.imba': './publisher/config.imba'
        }
      }
    }
  }
}