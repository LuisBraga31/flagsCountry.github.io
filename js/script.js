const contentFlags = document.querySelector('.flagsContent');
const inputSearch = document.querySelector('.searchInput');
const selectCountry = document.getElementById('select_countries');

let api = 'https://restcountries.com/v3.1/all';

let busca = [];
let countries = [];

// Subindo os países no Content

function getAllCountries() {
    fetch(api)
    .then(response => response.json())
    .then(data => {
        data.map( (data) => {
            countries.push(data);

        });
        
        // Ordenando Países
        countries.sort((a,b) => {
            const paisA = a.name.common;
            const paisB = b.name.common;

            if(paisA < paisB) {
                return -1;
            } else if(paisA > paisB) {
                return 1;
            }
            return 0;
        });

        // Adicionando ao content
        for(let i = 0; i < countries.length; i++) {
            addHTML(countries[i]);
            busca.push(countries[i]);
        }

    });


}

// Rodando função

getAllCountries();

// Função de escolher países por Estado

function chooseCountryByRegion() {
    
    contentFlags.innerHTML = "";
    
    if (selectCountry.value === "All") {
        
        for(let i = 0; i < busca.length; i++) {
            addHTML(busca[i]);
        }
    
    } else {

        for(let i = 0; i < busca.length; i++) {
        
            if(selectCountry.value === busca[i].region) {
                addHTML(busca[i]);
            }
        }
    
    }


}

selectCountry.addEventListener('change', () => chooseCountryByRegion());




// Sistemas de Busca, onde quando escreve o sistema é ativado.
inputSearch.oninput = () => {
    contentFlags.innerHTML = "";
    busca
      .filter((item) =>
        item.name.common.toLowerCase().includes(inputSearch.value.toLowerCase())
      ).forEach((item) => addHTML(item));
      
};

// Adicionando Item ao HTML

function addHTML(item) {
    const div = document.createElement("div");

    div.innerHTML += `
        
        <img src="${item.flags.png}" alt="" srcset=""> 
        <p> ${item.name.common} </p>
        
    
    `
    contentFlags.append(div);
}