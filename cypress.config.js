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
    OLD_GHOST_SITE_URL: 'https://ghost-l9hj.onrender.com/',
    OLD_GHOST_ADMIN_URL: 'https://ghost-l9hj.onrender.com/ghost/',
    USERNAME: "darth@vader.com",
    PASSWORD: "yosoytupadre",
    publishButtonFound: true
  }
};
