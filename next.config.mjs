   /** @type {import('next').NextConfig} */
   const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'dndai-images.s3.eu-central-1.amazonaws.com',
          pathname: '/**',
        },
      ],
    },
  };

  export default nextConfig;