import type { Cat } from '../types';

const CATAAS_BASE_URL = 'https://cataas.com';

// We'll fetch random cats. We can use the /api/cats limit=20 endpoint.
// Note: Cataas API behavior might vary, we'll try to get json first.

export const fetchCats = async (limit: number = 20): Promise<Cat[]> => {
    try {
        const response = await fetch(`${CATAAS_BASE_URL}/api/cats?limit=${limit}&skip=0`);
        if (!response.ok) {
            throw new Error(`Failed to fetch cats: ${response.statusText}`);
        }
        return await response.json();

        // Map data to ensure strict typing if necessary, but the interface should match the API response roughly.
        // We add the base URL to verify the image works later if needed, but the ID is enough to construct the URL.
    } catch (error) {
        console.error("Error fetching cats:", error);
        return [];
    }
};

export const getCatImageUrl = (cat: Cat): string => {
    return `${CATAAS_BASE_URL}/cat/${cat.id}`;
};
