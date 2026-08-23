const ENVIRONMENT = {
    API_BASE_URL: "http://localhost:9000/api",
}

const API_ROUTES: Record<string, Record<string, Record<string, string>>> = {
    public: {
        reports: {
            search: `${ENVIRONMENT.API_BASE_URL}/public/reports/`,
        },
        scammers: {
            findById: `${ENVIRONMENT.API_BASE_URL}/public/scammers/{id}`,
            calendar: `${ENVIRONMENT.API_BASE_URL}/public/scammers/{id}/calendar/{year}`,
            contacts: `${ENVIRONMENT.API_BASE_URL}/public/scammers/{id}/contacts`,
        },
        organizations: {
            findById: `${ENVIRONMENT.API_BASE_URL}/public/organizations/{id}`,
            calendar: `${ENVIRONMENT.API_BASE_URL}/public/organizations/{id}/calendar/{year}`,
            contacts: `${ENVIRONMENT.API_BASE_URL}/public/organizations/{id}/contacts`,
        },
    },
} as const;

export { ENVIRONMENT, API_ROUTES };
