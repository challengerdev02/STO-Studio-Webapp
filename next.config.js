const withImages = require('next-images');
module.exports = withImages({
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\*.stories.tsx/,
      loader: 'ignore-loader',
    });
    //config.experiments = { asyncWebAssembly: true };
    return config;
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  images: {
    domains: ['storage.googleapis.com'],
  },
  // other Next.js configuration in your project
});
