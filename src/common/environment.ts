const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

const ENVIRONMENT = {
    API_BASE_URL: (configuredApiBaseUrl || "/api").replace(/\/+$/, ""),
}

const API_ROUTES: Record<string, Record<string, Record<string, string>>> = {
    public: {
        reports: {
            search: "/public/reports/",
        },
        scammers: {
            findById: "/public/scammers/{id}",
            calendar: "/public/scammers/{id}/calendar/{year}",
            contacts: "/public/scammers/{id}/contacts",
        },
        organizations: {
            findById: "/public/organizations/{id}",
            calendar: "/public/organizations/{id}/calendar/{year}",
            contacts: "/public/organizations/{id}/contacts",
        },
    },
} as const;

export { ENVIRONMENT, API_ROUTES };
