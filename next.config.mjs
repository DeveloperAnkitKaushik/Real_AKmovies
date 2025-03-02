import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
});

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap",
      },
      {
        source: "/robots.txt",
        destination: "/robots",
      },
      {
        source: "/manifest.json",
        destination: "/manifest",
      },
    ];
  },
};

export default withPWA(nextConfig);
