const isDev = process.env.NODE_ENV === "development";

module.exports = {
  images: {
    ...(isDev
      ? {
          remotePatterns: [
            {
              protocol: "http",
              hostname: "**",
              pathname: "/src/uploads/**",
            },
            {
              protocol: "https",
              hostname: "**",
              pathname: "/src/uploads/**",
            },
          ],
        }
      : {
          // Allow any domain in production (not always recommended for security, but works for flexibility)
          remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
            {
              protocol: "http",
              hostname: "**",
            },
          ],
        }),
  },
};
