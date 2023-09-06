/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/home', // Redirect from root to /home
  //       permanent: true, // Use permanent HTTP 301 redirect
  //     },
  //   ];
  // },
  images: {
    domains: ['books.google.com', 'via.placeholder.com'],
  },
};

module.exports = nextConfig;
