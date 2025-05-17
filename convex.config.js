// @ts-check

/** @type {import('convex').Config} */
module.exports = {
  // When running `npx convex dev` or `npx convex deploy`,
  // this configures the URL of your Convex deployment.
  // You can also set this to "http://localhost:3000" to test locally.
  //
  // When you're ready to deploy, update this to your production URL.
  // For example, if your Convex deployment is at "https://happy-otter-123.convex.cloud",
  // set this to "https://happy-otter-123.convex.cloud".
  //
  // You can find your deployment URL by running `npx convex dashboard`.
  //
  // If you don't have a Convex deployment yet, run `npx convex dev` to create one.
  //
  // When you're ready to deploy to production, run `npx convex deploy`.
  //
  // Learn more at https://docs.convex.dev/quick-start
  //
  // When you're ready to deploy, update this to your production URL.
  // For example, if your Convex deployment is at "https://happy-otter-123.convex.cloud",
  // set this to "https://happy-otter-123.convex.cloud".
  //
  // You can find your deployment URL by running `npx convex dashboard`.
  //
  // If you don't have a Convex deployment yet, run `npx convex dev` to create one.
  //
  // When you're ready to deploy to production, run `npx convex deploy`.
  //
  // Learn more at https://docs.convex.dev/quick-start
  deployment: undefined,
  // Enable this to run Convex in development mode.
  // When enabled, Convex will use a local development server instead of connecting to Convex Cloud.
  //
  // Set this to false to connect to your production deployment.
  //
  // Learn more at https://docs.convex.dev/quick-start#local-development
  development: true,
  // The directory where Convex will store its development data.
  // This is relative to the directory containing this config file.
  dataDir: ".convex",
  // The directory where Convex will store its logs.
  // This is relative to the directory containing this config file.
  logDir: ".convex/logs",
  // The directory where Convex will store its cache.
  // This is relative to the directory containing this config file.
  cacheDir: ".convex/cache",
};
