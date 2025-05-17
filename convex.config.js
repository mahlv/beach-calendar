// @ts-check

module.exports = {
  // When running `npx convex dev` or `npx convex deploy`,
  // this configures the URL of your Convex deployment.
  // Set to undefined to use the default Convex deployment for this project.
  deployment: undefined,

  // Enable this to run Convex in development mode.
  // When true, Convex will use a local development server.
  // Set to false to connect to your production deployment.
  development: process.env.NODE_ENV !== 'production',

  // The directory where Convex will store its development data.
  // This is relative to the directory containing this config file.
  dataDir: ".convex",
  
  // The directory where Convex will store its logs.
  logDir: ".convex/logs",
  
  // The directory where Convex will store its cache.
  cacheDir: ".convex/cache",
};
