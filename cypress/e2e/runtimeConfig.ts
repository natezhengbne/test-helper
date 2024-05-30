export type RuntimeConfig = {
    addressSearchProvider: "google" | "idealPostcodes";
};

export const getRuntimeConfig = () => {
    const site = Cypress.env("site");
    if (site && siteConfig[site]) {
        return siteConfig[site];
    }

    return siteConfig.default;
};

type SiteConfig = {
    [site: string]: RuntimeConfig;
};

const siteConfig: SiteConfig = {
    default: {
        addressSearchProvider: "google",
    },
    jumbowin: {
        addressSearchProvider: "idealPostcodes",
    },
};
