import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Client-heavy dashboard: keep the default render model so pathname-based
  // navigation and LocalStorage hydration stay straightforward.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
