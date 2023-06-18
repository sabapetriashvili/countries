/* filter box menu */
const filterBox = document.querySelector('.filter-box');
const regionsOptions = document.querySelector('.regions');

filterBox.addEventListener('click', () => {
    regionsOptions.classList.toggle('active');
});

/* dark-mode */

const body = document.querySelector('body');
const moonLogo = document.querySelector('#moon-logo');
const pageMode = document.querySelector('#mode');

function changePageMode() {
  body.classList.toggle('dark-mode');

  pageMode.innerHTML === 'Dark Mode' ? pageMode.innerHTML = 'Light Mode' : pageMode.innerHTML = 'Dark Mode';
};

moonLogo.addEventListener('click', changePageMode);
pageMode.addEventListener('click', changePageMode);

/* Content */

const countriesJSON = 'https://restcountries.com/v3.1/all'
const countries = []

fetch(countriesJSON)
.then(blob => blob.json())
.then(data => {
  for (var key in data) {
  if (data.hasOwnProperty(key)) {
    countries.push(data[key]);
  }
}

const countriesSection = document.querySelector('.countries');

for (var i = 0; i < countries.length; i++) {
  const element = `<div class="country">
                 <img src="${countries[i].flags.svg}" alt="${countries[i].name.official}">

                 <div class="country-info">
                 <h2 class="country-name">${countries[i].name.official}</h2>
                 <h5 class="population"><strong>Population:</strong>${countries[i].population}</h5>
                 <h5 class="region-name"><strong>Region:</strong>${countries[i].region}</h5>
                 <h5 class="capital-name"><strong>Capital:</strong>${countries[i].capital}</h5>
                 </div>
                 </div>`; 

countriesSection.insertAdjacentHTML('beforeend', element);

}


/* search */
const searchInput = document.querySelector('#search');
const SearchItems = document.querySelectorAll('.country');
const filterName = document.querySelector('#filter-box-name');

searchInput.addEventListener('input', e => {
  const value = e.target.value.toLowerCase();

  SearchItems.forEach(country => {
    country.querySelector('.country-name').textContent.toLowerCase().includes(value) ? country.style.display = 'block' : country.style.display = 'none';
  })

  let searchedNum = 0;

  for(let i = 0; i < SearchItems.length; i++) {
    if(SearchItems[i].style.display !== 'none') {
      searchedNum++;
    }
  }

  function responsiveResults () {
    if(searchedNum < 3 && window.innerWidth > 1023 && window.innerWidth < 1301){
      countriesSection.setAttribute("id", "narrowSearch");
    } else {
      countriesSection.setAttribute("id", "");
    }
  }

  responsiveResults();
  window.addEventListener('resize', responsiveResults);



  filterName.innerHTML = 'Filter By Region';

});


/* Filter */
const regions = document.querySelectorAll('.region');

regions.forEach(region => {
  region.addEventListener('click', (e) => {
    filterName.innerHTML = e.target.innerHTML;

    SearchItems.forEach(country => {
      if(e.target.innerHTML === 'All') {
        country.style.display = 'block';
      } else {
        country.querySelector('.region-name').textContent.toLowerCase().includes(e.target.innerHTML.toLowerCase()) ? country.style.display = 'block' : country.style.display = 'none';
      }
    })

    regionsOptions.classList.remove('active');
    searchInput.value = '';
  });
});

//Country in Detail

const backBtn = document.querySelector('.back-button');
const countryDetails = document.querySelector('.country-details');
const filters = document.querySelector('#filters');
const borderCountries = document.querySelector('.border-countries');

SearchItems.forEach(country => {
  country.addEventListener('click', () => {
    for (var i = 0; i < countries.length; i++) {
      if(countries[i].name.official.toLowerCase() == country.querySelector('.country-name').textContent.toLowerCase()){
        const detailedImage = document.querySelector('.country-flag');
        const detailedName = document.querySelector('.country-detail-name');
        const detailedNativeName = document.querySelector('#detail-native-name');
        const detailPopulation = document.querySelector('#detail-population');
        const detailRegion = document.querySelector('#detial-region');
        const detailSubRegion = document.querySelector('#detail-sub-region');
        const detailCaptial = document.querySelector('#detail-Captial');
        const detailDomain = document.querySelector('#detail-Domain');
        const detailCurrencies = document.querySelector('#detail-currencies');
        const detailLanguages = document.querySelector('#detail-languages');

        detailedImage.src = countries[i].flags.svg;
        detailedName.innerHTML = countries[i].name.official;
        detailedNativeName.innerHTML = ' ' + Object.values(countries[i].name.nativeName)[0].common;
        detailPopulation.innerHTML = ' ' + countries[i].population;
        detailRegion.innerHTML = ' ' + countries[i].region;
        detailSubRegion.innerHTML = ' ' + countries[i].subregion;
        detailCaptial.innerHTML = ' ' + countries[i].capital;
        detailDomain.innerHTML = ' ' + countries[i].tld[0];
        detailCurrencies.innerHTML = ' ' + Object.keys(countries[i].currencies);
        detailLanguages.innerHTML = ' ' + Object.values(countries[i].languages);

        if(countries[i].borders) {
          for(var z = 0; z < countries[i].borders.length; z++) {
            let borderElement = `<h4 class="border-country">${countries[i].borders[z]}</h4>`; 
            borderCountries.insertAdjacentHTML('beforeend', borderElement);
          }
        } else {
          let borderElement = '<h4 class="border-country">No border Countries</h4>';
          borderCountries.insertAdjacentHTML('beforeend', borderElement);
        }
      }
    }

    filters.style.display = 'none';
    countriesSection.style.display = 'none';
    countryDetails.classList.add('opened');
  });
});

backBtn.addEventListener('click', () => {
  countryDetails.classList.remove('opened');
  setTimeout(() => {
    filters.style.display = 'flex';
    countriesSection.style.display = 'flex';
  }, 300);

  const allBorderCountries = document.querySelectorAll('.border-country');
  allBorderCountries.forEach(border => {
    border.remove();
  });
  
});

});






















