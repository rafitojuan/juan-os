import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["juanos.local", "*.local", "localhost:3000"],
};

export default nextConfig;
