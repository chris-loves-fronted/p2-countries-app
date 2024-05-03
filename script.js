// @ts-nocheck
import { API } from './API.js';
import { UI } from './UI.js';

// Global Scope Variables
const loadingSpinner = document.getElementById('loadingSpinner');
const searchField = document.getElementById('countrySearch');
const searchIcon = document.getElementById('searchIcon');
const selectField = document.getElementById('continentFilter');
const mainGrid = document.querySelector('main');
const websiteLogo = document.getElementById('websiteLogo');
const colorModeSwitcher = document.getElementById('colorModeSwitcher');
const bodyTag = document.querySelector('body');

let countries = [];
let continents = [];
let filteredCountries = [];
let selectedContinent = '';
let searchInputValue = '';

// Check for Fetching Countries Data Error
window.addEventListener('FetchDataFail', () => {
    mainGrid.innerHTML = 'Error! Please try again later.';
    loadingSpinner.hidden = true;
});

// Fetching Countries from API
window.addEventListener('DOMContentLoaded', async () => {
    countries = [...(await API.fetchCountries())];

    if (countries) {
        const countryFetchEvent = new Event('CountriesFetched', { bubbles: true });

        continents = new Set(countries.map((country) => (country = country.region)));
        document.dispatchEvent(countryFetchEvent);

        loadingSpinner.hidden = true;
    }
});

// Rendering Countries Data into DOM
document.addEventListener('CountriesFetched', () => {
    UI.renderContinents(continents, continentFilter);
    UI.renderCountryCards(countries, mainGrid);

    selectField.addEventListener('change', ({ target: { value } }) => {
        selectedContinent = value.toLowerCase();
        filteredCountries = filterCountries(countries, searchInputValue, selectedContinent);

        mainGrid.innerHTML = '';
        UI.renderCountryCards(filteredCountries, mainGrid);
    });

    searchField.addEventListener('input', ({ target: { value } }) => {
        searchInputValue = value;
        filteredCountries = filterCountries(countries, searchInputValue, selectedContinent);

        if (!filteredCountries.length) {
            return (mainGrid.innerHTML = 'No Countries found');
        }

        mainGrid.innerHTML = '';
        UI.renderCountryCards(filteredCountries, mainGrid);
    });
});

// Switch Color Mode
document.addEventListener('DOMContentLoaded', () => {
    colorModeSwitcher.addEventListener('click', () => {
        bodyTag.setAttribute(
            'data-color-mode',
            bodyTag.getAttribute('data-color-mode') === 'dark' ? 'light' : 'dark'
        );

        let colorMode = bodyTag.getAttribute('data-color-mode');

        websiteLogo.setAttribute(
            'src',
            colorMode === 'light' ? '/assets/logo-dark.png' : '/assets/logo-white.png'
        );

        searchIcon.setAttribute(
            'src',
            colorMode === 'light' ? '/assets/search-black.svg' : '/assets/search-white.svg'
        );

        colorModeSwitcher.setAttribute(
            'src',
            colorMode === 'light' ? '/assets/moon.svg' : '/assets/sun.svg'
        );
    });
});

// Helpers
function filterCountries(countries, searchValue, selectedContinent) {
    const filteredCountries = countries.filter(
        (country) =>
            country.name.common.toLowerCase().includes(searchValue) &&
            (selectedContinent ? country.region.toLowerCase() === selectedContinent : country)
    );

    return filteredCountries;
}
