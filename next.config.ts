import withPWA from "next-pwa";

const withPWACustom = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  // ...existing config options...
};

export default withPWACustom(nextConfig);
