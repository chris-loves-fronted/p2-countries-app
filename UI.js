// @ts-nocheck
export const UI = {
    renderContinents: (contintents, node) => {
        for (const continent of contintents) {
            const option = document.createElement('option');

            option.value = continent.toLowerCase();
            option.textContent = continent;

            node.appendChild(option);
        }
    },
    renderCountryCards: (countries, node) => {
        countries.forEach((country) => {
            const [countryCard, countryImage, countryInfoContainer, countryInfo] =
                UI.createCountryCard();
            const [lang] = UI.getCountryLang(country.languages);

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
            countryCard.append(countryImage, countryInfoContainer);
            node.appendChild(countryCard);
        });
    },
    createCountryCard: () => {
        const countryCard = document.createElement('country-card');
        const countryImage = document.createElement('img');
        const countryInfoContainer = document.createElement('country-info');
        const countryInfo = document.createElement('p');

        return [countryCard, countryImage, countryInfoContainer, countryInfo];
    },

    getCountryLang: (langObject) => {
        if (langObject !== undefined) {
            return Object.entries(langObject);
        }

        return 'n/a';
    },
};
