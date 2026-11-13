/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",            // HTML estático (SEO e GEO)
  images: { unoptimized: true },
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
