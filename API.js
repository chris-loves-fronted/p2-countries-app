export const API = {
    fetchCountries: async () => {
        const RESPONSE = await fetch('https://restcountries.com/v3.1/all');

        if (!RESPONSE.ok) {
            console.log(RESPONSE.status);
        }

        const countries = await RESPONSE.json();

        return countries;
    },
};
