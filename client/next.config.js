const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
  // output: "export",
  // images: { unoptimized: true },
};

module.exports = nextConfig;
