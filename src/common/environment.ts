const ENVIRONMENT = {
    API_BASE_URL: "http://localhost:9000/api",
}

const API_ROUTES: Record<string, Record<string, Record<string, string>>> = {
    public: {
        reports: {
            search: `${ENVIRONMENT.API_BASE_URL}/public/reports/`,
            monthly: `${ENVIRONMENT.API_BASE_URL}/public/reports/{type}/{id}/monthly`,
        },
        scammers: {
            findById: `${ENVIRONMENT.API_BASE_URL}/public/scammers/{id}`,
        },
        organizations: {
            findById: `${ENVIRONMENT.API_BASE_URL}/public/organizations/{id}`,
        },
    },
} as const;

export { ENVIRONMENT, API_ROUTES };
