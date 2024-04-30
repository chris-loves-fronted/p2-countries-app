// @ts-nocheck
window.addEventListener('DOMContentLoaded', async () => {
    const countries = await fetchCountries();
    const mainGrid = document.querySelector('main');

    console.log(countries);

    countries.forEach((country) => {
        [gridItem, countryImage, countryInfoContainer, countryInfo] = createCountryCard();

        const [lang] = getCountryLang(country.languages);

        countryInfoContainer.title = country.name.official;

        countryImage.src = country.flags.svg;
        countryImage.alt = country.name.common;
        countryImage.style.width = 'inherit';
        countryImage.title = country.name.official;

        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <h3><span>Capital:</span> ${country.capital}</h3>
            <h3><span>Region:</span> ${country.region}</h3>
            <h3><span>Population:</span> ${country.population.toLocaleString()}</h3>
            <h3><span>Spoken Language:</span> ${lang.at(1)}</h3>
        `;

        countryInfoContainer.appendChild(countryInfo);

        gridItem.append(countryImage, countryInfoContainer);
        mainGrid?.appendChild(gridItem);
    });
});

function getCountryLang(langObject) {
    console.log(langObject);
    if (langObject !== undefined) {
        return Object.entries(langObject);
    }

    return 'n/a';
}

function createCountryCard() {
    const gridItem = document.createElement('country-card');
    const countryImage = document.createElement('img');
    const countryInfoContainer = document.createElement('country-info');
    const countryInfo = document.createElement('p');

    return [gridItem, countryImage, countryInfoContainer, countryInfo];
}

async function fetchCountries() {
    const RESPONSE = await fetch('https://restcountries.com/v3.1/all');

    if (!RESPONSE.ok) {
        console.log(RESPONSE.status);
    }

    const countries = await RESPONSE.json();

    return countries;
}
