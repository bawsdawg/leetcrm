/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["mongoose"],

  async redirects() {
    return [{ source: "/time/track", destination: "/time", permanent: false }];
  },
};

export default nextConfig;
