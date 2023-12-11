/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_AUTHOR_USERNAME: process.env.AUTHOR_USERNAME,
    NEXT_AUTHOR_EMAIL: process.env.AUTHOR_EMAIL,
    NEXT_API_KEY: process.env.API_KEY,
    NEXT_AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    NEXT_DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PROJECT_ID: process.env.PROJECT_ID,
    NEXT_STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    NEXT_MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    NEXT_APP_ID: process.env.APP_ID,
  },
};

module.exports = nextConfig;
