/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/assets/images/avatar.png',
        headers: [{ key: 'Cache-Control', value: 'max-age=6912000' }], // 80 days
      },
    ];
  },
  images: {
    deviceSizes: [428],
    imageSizes: [64],
  },
};

export default nextConfig;
