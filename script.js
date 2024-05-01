// @ts-nocheck
import { API } from './API.js';
import { UI } from './UI.js';

const mainGrid = document.querySelector('main');
const searchInput = document.getElementById('countrySearch');
const areaFilter = document.getElementById('areaFilter');

let countries;

// Fetching Countries from API
window.addEventListener('DOMContentLoaded', async () => {
    const loadingSpinner = document.getElementById('loadingSpinner');
    countries = await API.fetchCountries();

    if (countries) {
        const countryFetchEvent = new Event('CountriesFetched', { bubbles: true });

        document.dispatchEvent(countryFetchEvent);
        loadingSpinner.hidden = true;
    }
});

// Rendering Countries into DOM
document.addEventListener('CountriesFetched', () => {
    UI.renderCountryCards(countries, mainGrid);

    const remDuplicateAreas = new Set(countries.map((country) => (country = country.region)));

    for (const area of remDuplicateAreas) {
        const option = document.createElement('option');

        option.value = area.toLowerCase();
        option.textContent = area;

        areaFilter.appendChild(option);
    }

    // Filtering Countries by Search Input
    searchInput.addEventListener('input', ({ target: { value } }) => {
        const filteredCountries = countries.filter((country) =>
            country.name.common.toLowerCase().includes(value.toLowerCase())
        );

        mainGrid.innerHTML = '';
        UI.renderCountryCards(filteredCountries, mainGrid);

        if (!filteredCountries.length) mainGrid.innerHTML = 'No Countries found';
    });
});
