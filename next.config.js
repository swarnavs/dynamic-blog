const isDev = process.env.NODE_ENV === "development";

module.exports = {
  images: {
    ...(isDev
      ? {
          remotePatterns: [
            {
              protocol: "http",
              hostname: "localhost",
              port: "5000",
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
