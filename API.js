export const API = {
    fetchCountries: async () => {
        const RESPONSE = await fetch('https://restcountries.com/v3.1/all');

        if (!RESPONSE.ok) {
            const fetchErrorEvent = new Event('FetchDataFail', { bubbles: true });
            document.dispatchEvent(fetchErrorEvent);
            return;
        }

        const countries = await RESPONSE.json();
        return countries;
    },
};
