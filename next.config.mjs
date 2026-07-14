/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // SVG placeholders are used throughout; keep the optimizer out of the way
    // so the showcase renders reliably anywhere. Flip to your CDN in production.
    unoptimized: true,
  },
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
