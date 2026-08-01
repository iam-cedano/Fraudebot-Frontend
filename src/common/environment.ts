const ENVIRONMENT = {
    API_BASE_URL: "http://localhost:9000/api",
}

const API_ROUTES = {
    public: {
        reports: {
            search: `${ENVIRONMENT.API_BASE_URL}/public/reports/`,
        },
    },
};

export { ENVIRONMENT, API_ROUTES };