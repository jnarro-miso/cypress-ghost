module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: true,
  env: {
    GHOST_SITE_URL: 'https://ghost-rpq7.onrender.com/',
    // GHOST_SITE_URL: 'http://localhost:2368/',
    OLD_GHOST_SITE_URL: 'https://ghost-l9hj.onrender.com/',
    // OLD_GHOST_SITE_URL: 'http://localhost:3001/',
    GHOST_ADMIN_URL: 'https://ghost-rpq7.onrender.com/ghost/',
    // GHOST_ADMIN_URL: 'http://localhost:2368/ghost/',
    OLD_GHOST_ADMIN_URL: 'https://ghost-l9hj.onrender.com/ghost',
    // OLD_GHOST_ADMIN_URL: 'http://localhost:3001/ghost/',
    USERNAME: "darth@vader.com",
    PASSWORD: "yosoytupadre"
  }
};
