import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
     return {
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: `/api/:path*`, 
          destination: `http://localhost:4000/api/:path*`, 
        },
      ],
    }
  },
};

export default nextConfig;
