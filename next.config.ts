import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* React Compiler disabled — causes very slow Turbopack recompilation in dev */
  output: 'export',
  distDir: 'dist',
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    unoptimized: true,
  },
};

export default nextConfig;
