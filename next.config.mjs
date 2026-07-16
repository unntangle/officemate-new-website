/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    /**
     * Next serves WebP (and resizes per breakpoint) automatically for anything
     * rendered through next/image. `unoptimized` was only needed back when the
     * gallery was generated SVG placeholders — with real photography it costs
     * us the format conversion and the responsive srcset, so it stays off.
     */
    formats: ["image/avif", "image/webp"],
  },
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
