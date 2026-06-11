/** @type {import('next').NextConfig} */
const deploymentUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://anishallamneni.com");
const normalizedDeploymentUrl = deploymentUrl.replace(/\/+$/, "");

const nextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: normalizedDeploymentUrl,
  },
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
