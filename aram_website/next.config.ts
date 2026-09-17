import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Let the dev server be opened through a VS Code port-forward tunnel.
  allowedDevOrigins: ["*.devtunnels.ms"],
};

export default nextConfig;
