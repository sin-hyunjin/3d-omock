/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(exr)$/,
      use: ["file-loader"],
    });
    return config;
  },
};

export default nextConfig;
