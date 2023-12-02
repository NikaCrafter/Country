async function fetchCountryDetails(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;
  
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw new Error(`Error fetching country details: ${error.message}`);
    }
}

async function displayDetails() {
    const countryName = document.getElementById("user-input").value;

    if (countryName.trim() === "") {
        alert("Please enter a country name.");
        return;
    }

    try {
        const detailsArray = await fetchCountryDetails(countryName);

        if (detailsArray.length === 0) {
            alert("Country not found. Please enter a valid country name.");
            return;
        }

        const details = detailsArray[0];

        const capital = details.capital[0];
        const currencies = details.currencies || {};
        const currencyCode = Object.keys(currencies)[0];
        const currency = currencies[currencyCode]?.name || 'N/A';
        const population = details.population;
        const mainLanguage = details.languages ? details.languages[Object.keys(details.languages)[0]] : 'N/A';

        const output_capital = document.getElementById("capital");
        const output_population = document.getElementById("population");
        const output_currency = document.getElementById("currency");
        const output_languages = document.getElementById("languages");

        output_capital.innerHTML = `<span class="detail-header">Capital:</span> ${capital}`;
        output_population.innerHTML = `<span class="detail-header">Population:</span> ${population}`;
        output_currency.innerHTML = `<span class="detail-header">Currency:</span> ${currency}`;
        output_languages.innerHTML = `<span class="detail-header">Main Language:</span> ${mainLanguage}`;

        
        const output_countryName = document.getElementById("country-name");
        const output_countryImage = document.getElementById("country-image");

        output_countryName.innerHTML = details.name.common;
        output_countryImage.src = details.flags.svg;

    } catch (error) {
        console.error(error.message);
        alert("Error fetching country details. Please try again.");
    }
}




const search_button = document.getElementById("search-button");
search_button.addEventListener("click", displayDetails);
