/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pino", "pino-pretty"]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dragon-images.s3.eu-north-1.amazonaws.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "dev-dragon-images.s3.eu-north-1.amazonaws.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
