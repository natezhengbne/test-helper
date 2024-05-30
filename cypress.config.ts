import { defineConfig } from "cypress";

export default defineConfig({
    env: {
        site: "ozl",
    },
    e2e: {
        baseUrl: "http://www.ozlotteries.natez.dev.lan",
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    chromeWebSecurity: false,
});
