// Elemento SELECT donde pondre los OPTION
const countriSelector = document.getElementById('countryList');
let texto = document.getElementsByTagName('textarea')[0];
const lista = document.getElementsByTagName('ul')[0];

// Pinto una opción en el menú OPTION
const addSelectOption = (name, countriCode) => {
    const option = document.createElement('option'); // Elemento a crear de tipo option
    option.innerHTML = name; // Texto de entre los tags <option>
    option.setAttribute("value", countriCode) // Asignamos como atrinuto el precio
    option.setAttribute("name", name);
    countriSelector.appendChild(option);  // Añadimos el elemento al select
    return;
}

// Print en consola el value seleccionado
const getCountriCode = () => {
    texto.value = countriSelector.value;
}

// Listado de paises
const loadCountries = () => {
    fetch(`https://restcountries.eu/rest/v2/all`)
        .then(countries => countries.json())
        .then(countries => {
            countries.forEach(country => {
                addSelectOption(country.name, country.alpha2Code);
            });
        })
        .catch(error => console.log(`Crash ${error.message}`))
}

// Listado de vecinos
const getNeighbourns = () => {
    
    // Borramos la lista de paises que hemos recuperado anteriormente
    lista.childNodes.forEach(n => n.remove());
    lista.innerHTML = "";

    fetch(`https://api.geodatasource.com/neighbouring-countries?key=WSP78HBRZOG6KHIFUIC0DKTHJ1RXYETX&country_code=${countriSelector.value}`)
        .then(neighbouns => neighbouns.json())
        .then(neighbouns => {
            neighbouns.forEach(neighbourn => { 
                // Para cada resultado añado al <ul> un elemento tipo li con el nombre del pais 
                const list = document.createElement('li');
                list.innerHTML = neighbourn.country_name;
                lista.appendChild(list);
            })
        });
}

// Cargo el menu option con el json
loadCountries();

// Cada vez que se selecciona algo en el desplegable consulto los vecinos
countriSelector.addEventListener('change', getNeighbourns);