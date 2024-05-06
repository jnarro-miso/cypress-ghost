module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: true,
  env: {
    GHOST_SITE_URL: 'https://ghost-rpq7.onrender.com/',
    GHOST_ADMIN_URL: 'https://ghost-rpq7.onrender.com/ghost/',
    USERNAME: "darth@vader.com",
    PASSWORD: "yosoytupadre"
  }
};
