/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/my-photo-site',
  assetPrefix: '/my-photo-site/'
};

export default nextConfig;

