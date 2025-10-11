/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "firebasestorage.googleapis.com",
      "i.imgur.com",
      "lh3.googleusercontent.com",
      "drive.google.com",
      "vercel.app"
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
