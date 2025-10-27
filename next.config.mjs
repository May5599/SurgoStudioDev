import createMDX from "@next/mdx";

/** 
 * Enable MDX and Cloudinary images support
 */
const withMDX = createMDX({
  // process both .md and .mdx files
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Include .mdx in pages and routes
  pageExtensions: ["js", "jsx", "mdx"],

  // Allow Cloudinary-hosted images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // Optional: faster builds, better caching
  experimental: {
    optimizeCss: true,
    turbo: {
      rules: {
        "*.mdx": ["@next/mdx"],
      },
    },
  },
};

// Export wrapped config
export default withMDX(nextConfig);
