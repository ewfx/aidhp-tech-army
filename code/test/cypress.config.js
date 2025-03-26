const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",  // ✅ Ensure this matches Angular UI
    chromeWebSecurity: false,          // ✅ Disable security that blocks cross-origin requests
    experimentalSessionAndOrigin: true // ✅ Allow tests to access multiple origins
  },
});
