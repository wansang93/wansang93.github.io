import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
