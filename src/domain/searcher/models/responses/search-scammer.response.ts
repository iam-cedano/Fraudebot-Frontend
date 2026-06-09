type SearchScammerResponse = {
    data: {
        id: string;
        name: string;
        iso_country: string;
        is_active: boolean;
    }[];
};

export default SearchScammerResponse;